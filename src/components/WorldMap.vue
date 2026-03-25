<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { mapPoints, SVG_VIEWBOX } from '@/data/mapData'

const { locale } = useI18n()

const containerRef = ref<HTMLElement | null>(null)
const hoveredIndex = ref<number | null>(null)
const tooltipStyle = ref({ left: '0px', top: '0px' })

// Convert SVG coordinates to percentage position on the container
function svgToPercent(svgX: number, svgY: number) {
  return {
    left: ((svgX - SVG_VIEWBOX.minX) / SVG_VIEWBOX.width) * 100,
    top: ((svgY - SVG_VIEWBOX.minY) / SVG_VIEWBOX.height) * 100,
  }
}

const points = computed(() =>
  mapPoints.map((p, i) => {
    const pos = svgToPercent(p.svgX, p.svgY)
    return {
      ...p,
      index: i,
      left: pos.left,
      top: pos.top,
      displayName: locale.value === 'en' ? p.countryEn : p.country,
    }
  })
)

function onDotEnter(event: MouseEvent, index: number) {
  hoveredIndex.value = index
  updateTooltipPosition(event)
}

function onDotMove(event: MouseEvent) {
  if (hoveredIndex.value !== null) {
    updateTooltipPosition(event)
  }
}

function onDotLeave() {
  hoveredIndex.value = null
}

function updateTooltipPosition(event: MouseEvent) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  tooltipStyle.value = {
    left: `${x}px`,
    top: `${y - 12}px`,
  }
}

const hoveredData = computed(() => {
  if (hoveredIndex.value === null) return null
  return points.value[hoveredIndex.value]
})
</script>

<template>
  <div ref="containerRef" class="relative w-full rounded-xl overflow-hidden shadow-md bg-[#eaf1f7]">
    <!-- Real world map SVG -->
    <img
      src="/images/world-map.svg"
      alt="World Map"
      class="w-full h-auto block"
      draggable="false"
    />

    <!-- Red dots overlay -->
    <div
      v-for="point in points"
      :key="point.index"
      class="absolute group"
      :style="{
        left: point.left + '%',
        top: point.top + '%',
        transform: 'translate(-50%, -50%)',
      }"
    >
      <!-- Pulse ring -->
      <div class="absolute inset-0 -m-2 rounded-full bg-red-500/30 animate-ping" style="animation-duration: 2.5s;"></div>
      <!-- Dot -->
      <div
        class="relative w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform z-10"
        @mouseenter="onDotEnter($event, point.index)"
        @mousemove="onDotMove"
        @mouseleave="onDotLeave"
      ></div>
    </div>

    <!-- Tooltip -->
    <div
      v-if="hoveredData"
      class="absolute z-50 pointer-events-none"
      :style="{
        left: tooltipStyle.left,
        top: tooltipStyle.top,
        transform: 'translate(-50%, -100%)',
      }"
    >
      <div class="bg-dark text-white px-4 py-3 rounded-lg shadow-xl text-sm whitespace-nowrap">
        <div class="font-bold text-primary text-base">{{ hoveredData.displayName }}</div>
        <div
          v-for="org in hoveredData.organizations"
          :key="org"
          class="text-gray-300 text-xs mt-0.5"
        >
          {{ org }}
        </div>
        <!-- Arrow -->
        <div class="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-dark rotate-45"></div>
      </div>
    </div>
  </div>
</template>
