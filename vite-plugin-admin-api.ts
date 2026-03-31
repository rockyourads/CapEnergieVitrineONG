import type { Plugin } from 'vite'
import { readFileSync, writeFileSync, readdirSync, statSync, unlinkSync, mkdirSync, existsSync } from 'fs'
import { join, resolve } from 'path'

export default function adminApiPlugin(): Plugin {
  const publicDir = resolve(process.cwd(), 'public')
  const dataDir = join(publicDir, 'data')
  const imagesDir = join(publicDir, 'images')
  const esfDir = join(imagesDir, 'esf')

  return {
    name: 'admin-api',
    configureServer(server) {
      // --- JSON Data CRUD ---

      // GET /api/data/:filename — read a JSON file
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next()

        const url = new URL(req.url, 'http://localhost')

        // GET /api/data/:filename
        const dataMatch = url.pathname.match(/^\/api\/data\/(.+\.json)$/)
        if (dataMatch && req.method === 'GET') {
          const filePath = join(dataDir, dataMatch[1])
          try {
            const content = readFileSync(filePath, 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.end(content)
          } catch {
            res.statusCode = 404
            res.end(JSON.stringify({ error: 'File not found' }))
          }
          return
        }

        // PUT /api/data/:filename — write a JSON file
        if (dataMatch && req.method === 'PUT') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              // Validate JSON
              const parsed = JSON.parse(body)
              const filePath = join(dataDir, dataMatch[1])
              // Ensure parent directory exists
              const dir = filePath.substring(0, filePath.lastIndexOf('/'))
              if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
              writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (e) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: String(e) }))
            }
          })
          return
        }

        // --- Media endpoints ---

        // GET /api/media — list all galleries
        if (url.pathname === '/api/media' && req.method === 'GET') {
          try {
            const galleries = readdirSync(esfDir)
              .filter(name => {
                const stat = statSync(join(esfDir, name))
                return stat.isDirectory()
              })
              .map(name => {
                const files = readdirSync(join(esfDir, name))
                  .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
                return {
                  name,
                  count: files.length,
                  totalSize: files.reduce((sum, f) => {
                    try { return sum + statSync(join(esfDir, name, f)).size } catch { return sum }
                  }, 0),
                }
              })
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(galleries))
          } catch {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Failed to list galleries' }))
          }
          return
        }

        // GET /api/media/:gallery — list images in a gallery
        const galleryMatch = url.pathname.match(/^\/api\/media\/([^/]+)$/)
        if (galleryMatch && req.method === 'GET') {
          const galleryDir = join(esfDir, galleryMatch[1])
          try {
            const files = readdirSync(galleryDir)
              .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
              .map(f => {
                const stat = statSync(join(galleryDir, f))
                return {
                  name: f,
                  path: `/images/esf/${galleryMatch[1]}/${f}`,
                  size: stat.size,
                  modified: stat.mtime.toISOString(),
                }
              })
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(files))
          } catch {
            res.statusCode = 404
            res.end(JSON.stringify({ error: 'Gallery not found' }))
          }
          return
        }

        // DELETE /api/media/:gallery/:filename — delete an image
        const deleteMatch = url.pathname.match(/^\/api\/media\/([^/]+)\/([^/]+)$/)
        if (deleteMatch && req.method === 'DELETE') {
          const filePath = join(esfDir, deleteMatch[1], deleteMatch[2])
          try {
            unlinkSync(filePath)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true }))
          } catch {
            res.statusCode = 404
            res.end(JSON.stringify({ error: 'File not found' }))
          }
          return
        }

        // POST /api/media/upload — upload image(s) to a gallery
        if (url.pathname === '/api/media/upload' && req.method === 'POST') {
          const gallery = url.searchParams.get('gallery')
          if (!gallery) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Missing gallery parameter' }))
            return
          }
          const galleryDir = join(esfDir, gallery)
          if (!existsSync(galleryDir)) mkdirSync(galleryDir, { recursive: true })

          const chunks: Buffer[] = []
          req.on('data', (chunk: Buffer) => { chunks.push(chunk) })
          req.on('end', () => {
            try {
              const body = Buffer.concat(chunks)
              const contentType = req.headers['content-type'] || ''

              if (contentType.includes('multipart/form-data')) {
                // Parse multipart form data manually (simple parser)
                const boundaryMatch = contentType.match(/boundary=(.+)/)
                if (!boundaryMatch) {
                  res.statusCode = 400
                  res.end(JSON.stringify({ error: 'Missing boundary' }))
                  return
                }
                const boundary = boundaryMatch[1]
                const parts = parseMultipart(body, boundary)
                const uploaded: string[] = []

                for (const part of parts) {
                  if (part.filename && part.data) {
                    const filePath = join(galleryDir, part.filename)
                    writeFileSync(filePath, part.data)
                    uploaded.push(`/images/esf/${gallery}/${part.filename}`)
                  }
                }

                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true, uploaded }))
              } else {
                // Single file upload with filename in query
                const filename = url.searchParams.get('filename') || 'upload.jpg'
                const filePath = join(galleryDir, filename)
                writeFileSync(filePath, body)
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true, path: `/images/esf/${gallery}/${filename}` }))
              }
            } catch (e) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: String(e) }))
            }
          })
          return
        }

        // POST /api/manifest/regenerate — regenerate manifest.json
        if (url.pathname === '/api/manifest/regenerate' && req.method === 'POST') {
          try {
            const manifest: Record<string, string[]> = {}
            const galleries = readdirSync(esfDir).filter(name => {
              try { return statSync(join(esfDir, name)).isDirectory() } catch { return false }
            })

            for (const gallery of galleries) {
              const files = readdirSync(join(esfDir, gallery))
                .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
                .sort()
                .map(f => `/images/esf/${gallery}/${f}`)
              if (files.length > 0) {
                manifest[gallery] = files
              }
            }

            writeFileSync(join(esfDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, galleries: Object.keys(manifest).length }))
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: String(e) }))
          }
          return
        }

        // POST /api/media/create-gallery — create a new gallery folder
        if (url.pathname === '/api/media/create-gallery' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: string) => { body += chunk })
          req.on('end', () => {
            try {
              const { name } = JSON.parse(body)
              if (!name || !/^[a-z0-9-]+$/.test(name)) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'Invalid gallery name (use lowercase, numbers, hyphens only)' }))
                return
              }
              const galleryDir = join(esfDir, name)
              if (existsSync(galleryDir)) {
                res.statusCode = 409
                res.end(JSON.stringify({ error: 'Gallery already exists' }))
                return
              }
              mkdirSync(galleryDir, { recursive: true })
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, name }))
            } catch (e) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: String(e) }))
            }
          })
          return
        }

        next()
      })
    },
  }
}

interface MultipartPart {
  filename?: string
  data?: Buffer
  name?: string
}

function parseMultipart(body: Buffer, boundary: string): MultipartPart[] {
  const parts: MultipartPart[] = []
  const boundaryBuf = Buffer.from(`--${boundary}`)
  let start = body.indexOf(boundaryBuf) + boundaryBuf.length

  while (start < body.length) {
    const end = body.indexOf(boundaryBuf, start)
    if (end === -1) break

    const part = body.subarray(start, end)
    const headerEnd = part.indexOf('\r\n\r\n')
    if (headerEnd === -1) { start = end + boundaryBuf.length; continue }

    const headers = part.subarray(0, headerEnd).toString()
    const data = part.subarray(headerEnd + 4, part.length - 2) // Remove trailing \r\n

    const filenameMatch = headers.match(/filename="([^"]+)"/)
    const nameMatch = headers.match(/name="([^"]+)"/)

    parts.push({
      filename: filenameMatch?.[1],
      name: nameMatch?.[1],
      data: data.length > 0 ? Buffer.from(data) : undefined,
    })

    start = end + boundaryBuf.length
  }

  return parts
}
