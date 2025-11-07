<template>
  <div class="min-h-screen bg-nuxt-background">
    <!-- Mobile Menu Overlay -->
    <div 
      v-show="mobileMenuOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="mobileMenuOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 w-64 h-full bg-nuxt-primary border-r border-gray-700 transform transition-transform duration-300 z-50"
           :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">
      <div class="p-6">
        <!-- Logo/Brand -->
        <div class="flex items-center mb-8">
          <div class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
            <span class="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <h2 class="text-nuxt-text font-semibold">Acme Inc</h2>
            <p class="text-gray-400 text-caption">Enterprise</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="space-y-2">
          <div class="mb-6">
            <h3 class="text-gray-400 text-caption font-medium mb-3 uppercase tracking-wide">General</h3>
            <ul class="space-y-1">
              <li>
                <a href="#" class="flex items-center px-3 py-2 text-nuxt-text bg-gray-800 rounded-lg font-medium">
                  <span class="mr-3">🏠</span>
                  Home
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center px-3 py-2 text-gray-400 hover:text-nuxt-text hover:bg-gray-800 rounded-lg transition-colors">
                  <span class="mr-3">📧</span>
                  Email
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center px-3 py-2 text-gray-400 hover:text-nuxt-text hover:bg-gray-800 rounded-lg transition-colors">
                  <span class="mr-3">✅</span>
                  Tasks
                </a>
              </li>
            </ul>
          </div>

          <div class="mb-6">
            <h3 class="text-gray-400 text-caption font-medium mb-3 uppercase tracking-wide">Pages</h3>
            <ul class="space-y-1">
              <li>
                <a href="#" class="flex items-center px-3 py-2 text-gray-400 hover:text-nuxt-text hover:bg-gray-800 rounded-lg transition-colors">
                  <span class="mr-3">🔐</span>
                  Authentication
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center px-3 py-2 text-gray-400 hover:text-nuxt-text hover:bg-gray-800 rounded-lg transition-colors">
                  <span class="mr-3">⚠️</span>
                  Errors
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center px-3 py-2 text-gray-400 hover:text-nuxt-text hover:bg-gray-800 rounded-lg transition-colors">
                  <span class="mr-3">⚙️</span>
                  Settings
                  <span class="ml-auto bg-nuxt-button text-white text-xs px-2 py-1 rounded-full">New</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-gray-400 text-caption font-medium mb-3 uppercase tracking-wide">Components</h3>
            <ul class="space-y-1">
              <li>
                <a href="#" class="flex items-center px-3 py-2 text-gray-400 hover:text-nuxt-text hover:bg-gray-800 rounded-lg transition-colors">
                  <span class="mr-3">🧩</span>
                  Components
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <!-- User Profile -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center flex-1">
            <div class="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
              <span class="text-nuxt-text font-medium">{{ userInitials }}</span>
            </div>
            <div class="flex-1">
              <p class="text-nuxt-text font-medium text-body-sm">{{ userName }}</p>
              <p class="text-gray-400 text-caption truncate">{{ userEmail }}</p>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
            title="Sair"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="lg:ml-64 transition-all duration-300">
      <!-- Header -->
      <header class="bg-nuxt-primary border-b border-gray-700 px-4 lg:px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <!-- Mobile Menu Button -->
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="lg:hidden mr-4 p-2 text-nuxt-text hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            
            <h1 class="text-lg lg:text-heading-lg text-nuxt-text font-bold">Dashboard</h1>
          </div>
          
          <div class="flex items-center space-x-2 lg:space-x-4">
            <!-- Date Range - Hidden on mobile, show abbreviated version -->
            <div class="hidden sm:flex items-center bg-gray-800 rounded-lg px-3 lg:px-4 py-2">
              <span class="text-gray-400 mr-1 lg:mr-2">📅</span>
              <span class="text-nuxt-text text-xs lg:text-body-sm">Jan 20 - Feb 9, 2024</span>
            </div>
            
            <!-- Mobile Date Button -->
            <button class="sm:hidden p-2 bg-gray-800 rounded-lg text-gray-400">
              📅
            </button>
            
            <!-- Download Button -->
            <button class="btn-primary text-xs lg:text-body-base px-3 lg:px-6 py-2 lg:py-3">
              <span class="hidden sm:inline">Download</span>
              <span class="sm:hidden">📥</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="p-4 lg:p-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <!-- Total Revenue -->
          <div class="card">
            <div class="flex items-center justify-between mb-3 lg:mb-4">
              <h3 class="text-gray-400 text-xs lg:text-body-sm">Total Revenue</h3>
              <div class="flex items-center text-nuxt-button text-xs lg:text-body-sm">
                <span class="mr-1">📈</span>
                <span>+12.5%</span>
              </div>
            </div>
            <div class="mb-2">
              <span class="text-xl lg:text-heading-lg text-nuxt-text font-bold">US$ 1.250,44</span>
            </div>
            <p class="text-gray-400 text-xs lg:text-body-sm">Trending up this month 📈</p>
            <p class="text-gray-500 text-xs lg:text-caption hidden sm:block">Visitors for the last 6 months</p>
          </div>

          <!-- New Customers -->
          <div class="card">
            <div class="flex items-center justify-between mb-3 lg:mb-4">
              <h3 class="text-gray-400 text-xs lg:text-body-sm">New Customers</h3>
              <div class="flex items-center text-red-400 text-xs lg:text-body-sm">
                <span class="mr-1">📉</span>
                <span>-20%</span>
              </div>
            </div>
            <div class="mb-2">
              <span class="text-xl lg:text-heading-lg text-nuxt-text font-bold">1.234</span>
            </div>
            <p class="text-gray-400 text-xs lg:text-body-sm">Down 20% this period 📉</p>
            <p class="text-gray-500 text-xs lg:text-caption hidden sm:block">Acquisition needs attention</p>
          </div>

          <!-- Active Accounts -->
          <div class="card">
            <div class="flex items-center justify-between mb-3 lg:mb-4">
              <h3 class="text-gray-400 text-xs lg:text-body-sm">Active Accounts</h3>
              <div class="flex items-center text-nuxt-button text-xs lg:text-body-sm">
                <span class="mr-1">📈</span>
                <span>+12.5%</span>
              </div>
            </div>
            <div class="mb-2">
              <span class="text-xl lg:text-heading-lg text-nuxt-text font-bold">45.678</span>
            </div>
            <p class="text-gray-400 text-xs lg:text-body-sm">Strong user retention 📈</p>
            <p class="text-gray-500 text-xs lg:text-caption hidden sm:block">Engagement exceed targets</p>
          </div>

          <!-- Growth Rate -->
          <div class="card">
            <div class="flex items-center justify-between mb-3 lg:mb-4">
              <h3 class="text-gray-400 text-xs lg:text-body-sm">Growth Rate</h3>
              <div class="flex items-center text-nuxt-button text-xs lg:text-body-sm">
                <span class="mr-1">📈</span>
                <span>+4.5%</span>
              </div>
            </div>
            <div class="mb-2">
              <span class="text-xl lg:text-heading-lg text-nuxt-text font-bold">4,5%</span>
            </div>
            <p class="text-gray-400 text-xs lg:text-body-sm">Steady performance increase 📈</p>
            <p class="text-gray-500 text-xs lg:text-caption hidden sm:block">Meets growth projections</p>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="card">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6">
            <div class="mb-4 lg:mb-0">
              <h3 class="text-lg lg:text-heading-md text-nuxt-text font-semibold mb-1 lg:mb-2">Total Visitors</h3>
              <p class="text-gray-400 text-xs lg:text-body-sm">Total for the last 3 months</p>
            </div>
            
            <!-- Chart Controls -->
            <div class="flex flex-wrap gap-2 lg:space-x-2">
              <button class="px-2 lg:px-3 py-1 bg-gray-700 text-nuxt-text rounded text-xs lg:text-body-sm">3 months</button>
              <button class="px-2 lg:px-3 py-1 text-gray-400 hover:bg-gray-700 hover:text-nuxt-text rounded text-xs lg:text-body-sm transition-colors">30 days</button>
              <button class="px-2 lg:px-3 py-1 text-gray-400 hover:bg-gray-700 hover:text-nuxt-text rounded text-xs lg:text-body-sm transition-colors">7 days</button>
            </div>
          </div>

          <!-- Chart Placeholder (usando gradientes CSS) -->
          <div class="relative h-64 lg:h-80 bg-gradient-to-t from-gray-800/20 to-transparent rounded-lg overflow-hidden">
            <!-- Chart Legend -->
            <div class="absolute top-2 lg:top-4 right-2 lg:right-4 flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-2 lg:space-y-0">
              <div class="flex items-center">
                <div class="w-2 lg:w-3 h-2 lg:h-3 bg-purple-500 rounded-full mr-1 lg:mr-2"></div>
                <span class="text-gray-400 text-xs lg:text-caption">desktop</span>
              </div>
              <div class="flex items-center">
                <div class="w-2 lg:w-3 h-2 lg:h-3 bg-gray-500 rounded-full mr-1 lg:mr-2"></div>
                <span class="text-gray-400 text-xs lg:text-caption">mobile</span>
              </div>
            </div>

            <!-- Simulated Chart Area -->
            <div class="absolute bottom-0 left-0 right-0 p-2 lg:p-4">
              <!-- Y-Axis Labels -->
              <div class="absolute left-0 top-0 bottom-12 lg:bottom-16 flex flex-col justify-between text-gray-500 text-xs lg:text-caption">
                <span>500</span>
                <span class="hidden lg:inline">400</span>
                <span>300</span>
                <span class="hidden lg:inline">200</span>
                <span>100</span>
                <span>0</span>
              </div>
              
              <!-- X-Axis Labels -->
              <div class="flex justify-between text-gray-500 text-xs lg:text-caption pt-2 lg:pt-4">
                <span class="hidden sm:inline">2024-05-31</span>
                <span>05-31</span>
                <span class="hidden lg:inline">2024-06-05</span>
                <span class="hidden sm:inline">2024-06-10</span>
                <span>06-15</span>
                <span class="hidden lg:inline">2024-06-20</span>
                <span class="hidden sm:inline">2024-06-25</span>
                <span>06-30</span>
              </div>
            </div>

            <!-- Chart Visualization (simulated with gradients) -->
            <div class="absolute inset-0 m-8">
              <div class="h-full w-full relative">
                <div class="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-r from-purple-500/20 via-purple-400/30 to-purple-500/20 rounded-t-lg"></div>
                <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-r from-gray-500/10 via-gray-400/20 to-gray-500/10 rounded-t-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Estado reativo para menu mobile
const mobileMenuOpen = ref(false)

// Auth composable
const { user, signOut } = useAuth()

// Informações do usuário
const userName = computed(() => {
  if (!user.value) return 'Usuário'
  return user.value.email?.split('@')[0] || 'Usuário'
})

const userEmail = computed(() => {
  if (!user.value) return ''
  return user.value.email || ''
})

const userInitials = computed(() => {
  if (!user.value) return '??'
  const name = userName.value
  return name.substring(0, 2).toUpperCase()
})

// Logout
const handleLogout = async () => {
  await signOut()
}

// Configuração da página
useHead({
  title: 'Dashboard - Acme Inc Enterprise',
  meta: [
    { name: 'description', content: 'Dashboard administrativo com métricas e análises em tempo real' }
  ]
})
</script>

<style scoped>
/* Adicionar animações suaves */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}
</style>