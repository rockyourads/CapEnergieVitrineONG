import { ref, onMounted, onUnmounted, watch } from 'vue'

export function useCountUp(target: number, duration = 2000, prefix = '', suffix = '') {
  const counterRef = ref<HTMLElement | null>(null)
  const displayValue = ref(`${prefix}0${suffix}`)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null
  let animationId: number | null = null

  function animate() {
    const start = performance.now()

    function step(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Decelerate easing
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)

      displayValue.value = `${prefix}${current}${suffix}`

      if (progress < 1) {
        animationId = requestAnimationFrame(step)
      }
    }

    animationId = requestAnimationFrame(step)
  }

  onMounted(() => {
    if (!counterRef.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(counterRef.value)
  })

  watch(isVisible, (val) => {
    if (val) animate()
  })

  onUnmounted(() => {
    observer?.disconnect()
    if (animationId) cancelAnimationFrame(animationId)
  })

  return { counterRef, displayValue }
}
