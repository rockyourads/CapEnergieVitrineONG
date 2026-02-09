export interface Founder {
  name: string
  role: string
  description: string
  image: string
}

export const founders: Founder[] = [
  {
    name: 'Céline Loubet',
    role: 'Directrice Générale, Responsable Achats & Distribution',
    description: 'Céline pilote la stratégie d\'achats et la distribution des solutions photovoltaïques Cap Énergie à travers le monde.',
    image: '/images/founders/celine-loubet.jpg',
  },
  {
    name: 'Sébastien Weibel',
    role: 'Directeur Général, Responsable Export',
    description: 'Sébastien développe les marchés internationaux et accompagne les partenaires ONG dans leurs projets d\'électrification.',
    image: '/images/founders/sebastien-weibel.jpg',
  },
  {
    name: 'Jean-Marc Darboux',
    role: 'Lead Stratégie',
    description: 'Jean-Marc définit la vision stratégique de Cap Énergie et oriente l\'entreprise vers les projets à fort impact humanitaire.',
    image: '/images/founders/jean-marc-darboux.jpg',
  },
]
