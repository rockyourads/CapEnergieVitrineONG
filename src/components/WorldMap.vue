<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { mapPoints } from '@/data/mapData'

const { locale } = useI18n()

const hoveredPoint = ref<number | null>(null)
const tooltipX = ref(0)
const tooltipY = ref(0)

// Convert lat/lon to SVG coordinates (equirectangular projection)
// viewBox is 1000 x 500
function toSvgX(lon: number) {
  return ((lon + 180) / 360) * 1000
}
function toSvgY(lat: number) {
  return ((90 - lat) / 180) * 500
}

const points = computed(() =>
  mapPoints.map((p, i) => ({
    ...p,
    x: toSvgX(p.lon),
    y: toSvgY(p.lat),
    index: i,
    displayName: locale.value === 'en' ? p.countryEn : p.country,
  }))
)

function showTooltip(index: number, x: number, y: number) {
  hoveredPoint.value = index
  tooltipX.value = x
  tooltipY.value = y
}

function hideTooltip() {
  hoveredPoint.value = null
}

const hoveredData = computed(() => {
  if (hoveredPoint.value === null) return null
  return points.value[hoveredPoint.value]
})
</script>

<template>
  <div class="relative w-full">
    <svg
      viewBox="0 0 1000 500"
      class="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Background -->
      <rect width="1000" height="500" fill="#f0f6fa" rx="8" />

      <!-- Simplified continent outlines -->
      <g fill="#d1dbe6" stroke="#b8c7d6" stroke-width="0.5">
        <!-- North America -->
        <path d="M80,60 L140,55 L175,70 L210,65 L240,80 L260,75 L265,90 L250,110 L260,130 L255,150 L240,170 L230,185 L215,190 L205,200 L190,210 L180,200 L165,205 L155,195 L140,200 L130,190 L120,195 L105,185 L95,170 L90,150 L95,135 L100,120 L95,105 L85,90 L80,75 Z" />
        <!-- Greenland -->
        <path d="M280,35 L310,30 L340,35 L350,50 L340,65 L315,70 L290,65 L280,50 Z" />
        <!-- South America -->
        <path d="M225,225 L240,220 L260,225 L280,235 L295,250 L305,270 L310,290 L305,310 L300,330 L290,350 L275,370 L260,385 L250,395 L245,385 L240,370 L235,350 L230,330 L225,310 L220,290 L215,270 L218,250 L220,235 Z" />
        <!-- Europe -->
        <path d="M430,55 L460,50 L480,55 L500,60 L510,70 L505,85 L510,100 L500,110 L495,120 L485,130 L470,125 L460,130 L445,125 L435,115 L430,100 L425,85 L428,70 Z" />
        <!-- UK -->
        <path d="M420,65 L425,60 L430,65 L425,75 L420,70 Z" />
        <!-- Africa -->
        <path d="M435,150 L450,145 L470,148 L490,145 L510,148 L530,150 L545,155 L560,165 L570,180 L575,200 L575,220 L570,240 L565,260 L555,280 L545,300 L530,315 L515,325 L500,330 L485,325 L475,315 L465,300 L460,280 L455,260 L450,240 L445,220 L440,200 L435,180 L433,165 Z" />
        <!-- Middle East -->
        <path d="M560,130 L580,125 L600,130 L610,140 L615,155 L610,170 L595,175 L580,170 L565,165 L560,150 Z" />
        <!-- India -->
        <path d="M660,145 L680,140 L695,150 L700,170 L695,190 L685,210 L670,220 L660,210 L655,190 L650,170 L655,155 Z" />
        <!-- Southeast Asia -->
        <path d="M730,175 L750,170 L770,175 L785,185 L790,200 L780,210 L760,215 L745,210 L735,200 L730,190 Z" />
        <!-- China / East Asia -->
        <path d="M700,80 L730,75 L760,80 L790,85 L810,95 L820,110 L815,130 L800,145 L780,150 L760,148 L740,145 L720,140 L710,130 L700,115 L695,100 Z" />
        <!-- Japan -->
        <path d="M840,100 L845,90 L850,100 L848,115 L842,120 L838,110 Z" />
        <!-- Australia -->
        <path d="M770,310 L800,300 L830,305 L855,315 L865,330 L860,350 L845,365 L820,370 L795,365 L775,355 L770,340 L768,325 Z" />
        <!-- Russia / Northern Asia -->
        <path d="M510,40 L560,35 L620,30 L680,28 L740,30 L790,35 L830,40 L850,50 L840,60 L810,65 L770,68 L730,65 L690,62 L650,60 L610,58 L570,55 L540,52 L515,50 Z" />
        <!-- Indonesia -->
        <path d="M790,240 L810,235 L830,238 L850,240 L855,248 L845,255 L825,258 L805,255 L790,250 Z" />
        <!-- Philippines archipelago -->
        <path d="M830,185 L835,180 L840,185 L838,195 L833,198 L828,192 Z" />
      </g>

      <!-- Map grid lines (subtle) -->
      <g stroke="#c5d3e0" stroke-width="0.3" stroke-dasharray="4,4" opacity="0.5">
        <line x1="0" y1="125" x2="1000" y2="125" />
        <line x1="0" y1="250" x2="1000" y2="250" />
        <line x1="0" y1="375" x2="1000" y2="375" />
        <line x1="250" y1="0" x2="250" y2="500" />
        <line x1="500" y1="0" x2="500" y2="500" />
        <line x1="750" y1="0" x2="750" y2="500" />
      </g>

      <!-- Red dots for each country -->
      <g v-for="point in points" :key="point.index">
        <!-- Pulse animation circle -->
        <circle
          :cx="point.x"
          :cy="point.y"
          r="8"
          fill="#DC2626"
          opacity="0.2"
        >
          <animate
            attributeName="r"
            values="5;12;5"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <!-- Main dot -->
        <circle
          :cx="point.x"
          :cy="point.y"
          r="5"
          fill="#DC2626"
          stroke="#FFFFFF"
          stroke-width="1.5"
          class="cursor-pointer transition-all"
          :class="{ 'scale-125': hoveredPoint === point.index }"
          @mouseenter="showTooltip(point.index, point.x, point.y)"
          @mouseleave="hideTooltip"
        />
      </g>
    </svg>

    <!-- Tooltip -->
    <Transition name="fade">
      <div
        v-if="hoveredData"
        class="absolute pointer-events-none bg-dark text-white px-4 py-3 rounded-lg shadow-lg text-sm z-10 max-w-xs"
        :style="{
          left: `${(hoveredData.x / 1000) * 100}%`,
          top: `${(hoveredData.y / 500) * 100}%`,
          transform: `translate(-50%, calc(-100% - 16px))`,
        }"
      >
        <div class="font-bold text-primary mb-1">{{ hoveredData.displayName }}</div>
        <div
          v-for="org in hoveredData.organizations"
          :key="org"
          class="text-gray-300 text-xs"
        >
          {{ org }}
        </div>
        <!-- Arrow -->
        <div class="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-dark rotate-45"></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
