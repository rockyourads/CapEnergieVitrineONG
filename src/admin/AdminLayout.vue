<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import AdminSidebar from './AdminSidebar.vue'
import AdminHeader from './AdminHeader.vue'

const store = useAdminStore()

onMounted(() => {
  store.loadAll()
})
</script>

<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main area -->
    <div class="flex-1 flex flex-col min-w-0">
      <AdminHeader />

      <!-- Content -->
      <main class="flex-1 overflow-y-auto p-6 lg:p-8">
        <RouterView />
      </main>
    </div>

    <!-- Toast notification -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-y-4 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-4 opacity-0"
      >
        <div
          v-if="store.toast"
          class="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium"
          :class="store.toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'"
        >
          {{ store.toast.message }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
