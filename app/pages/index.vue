<template>
  <div class="min-h-screen bg-nuxt-background">
    <!-- Mobile Navigation -->
    <nav class="lg:hidden bg-nuxt-primary border-b border-gray-700 px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-6 h-6 bg-nuxt-button rounded mr-2"></div>
          <span class="text-nuxt-text font-semibold text-sm">Nuxt Demo</span>
        </div>
        <div class="flex space-x-2">
          <NuxtLink to="/" class="text-nuxt-button text-sm font-medium">Home</NuxtLink>
          <NuxtLink to="/dashboard" class="text-gray-400 hover:text-nuxt-text text-sm font-medium transition-colors">Dashboard</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Header com tema Nuxt -->
    <header class="bg-nuxt-primary border-b border-gray-700">
      <div class="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <h1 class="text-gradient font-nuxt text-center lg:text-left">
          The Progressive
        </h1>
        <h1 class="text-nuxt-text font-nuxt -mt-2 lg:-mt-4 text-center lg:text-left">
          Web Framework
        </h1>
        <p class="text-body-base lg:text-body-lg text-secondary mt-4 lg:mt-6 max-w-full lg:max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
          Create high-quality web applications with Nuxt, the open source framework that makes full-stack development with Vue.js intuitive.
        </p>
        <div class="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3 lg:gap-4 items-center justify-center lg:justify-start">
          <button class="btn-primary w-full sm:w-auto">
            Get Started
          </button>
          <button class="btn-secondary w-full sm:w-auto">
            Learn More
          </button>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="container mx-auto px-4 lg:px-6 py-8 lg:py-16">
      <!-- Typography Demo -->
      <section class="mb-8 lg:mb-16">
        <h2 class="text-nuxt-text mb-6 lg:mb-8 text-center lg:text-left">Typography Examples</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <!-- Typography Showcase -->
          <div class="card">
            <h3 class="text-nuxt-text mb-3 lg:mb-4 text-center lg:text-left">Font Sizes</h3>
            <div class="space-y-3 lg:space-y-4">
              <p class="text-hero text-nuxt-text text-center lg:text-left">Hero Text</p>
              <p class="text-heading-xl text-nuxt-text text-center lg:text-left">Heading XL</p>
              <p class="text-heading-lg text-nuxt-text text-center lg:text-left">Heading Large</p>
              <p class="text-heading-md text-nuxt-text text-center lg:text-left">Heading Medium</p>
              <p class="text-body-lg text-secondary text-center lg:text-left">Body Large Text</p>
              <p class="text-body-base text-secondary text-center lg:text-left">Body Base Text</p>
              <p class="text-body-sm text-secondary text-center lg:text-left">Body Small Text</p>
              <p class="text-caption text-secondary text-center lg:text-left">Caption Text</p>
            </div>
          </div>

          <!-- Components Demo -->
          <div class="card">
            <h4 class="text-nuxt-text mb-4 lg:mb-6 text-center lg:text-left">Components</h4>
            <div class="space-y-3 lg:space-y-4">
              <button class="btn-primary w-full">
                Primary Button
              </button>
              <button class="btn-secondary w-full">
                Secondary Button
              </button>
              
              <div class="mt-4 lg:mt-6">
                <h5 class="text-nuxt-text mb-2 text-center lg:text-left">Gradient Text</h5>
                <p class="text-gradient text-heading-md font-bold text-center lg:text-left">
                  Beautiful Gradient Text
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Colors Demo -->
      <section class="mb-8 lg:mb-16">
        <div class="card">
          <h3 class="text-nuxt-text mb-4 lg:mb-6 text-center lg:text-left">Color Palette</h3>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <!-- Primary Colors -->
            <div class="space-y-2">
              <h4 class="text-nuxt-text text-xs lg:text-body-sm font-medium text-center">Primary</h4>
              <div class="w-full h-10 lg:h-12 bg-nuxt-primary rounded flex items-center justify-center">
                <span class="text-nuxt-text text-xs lg:text-caption">#050A1D</span>
              </div>
            </div>
            
            <!-- Background -->
            <div class="space-y-2">
              <h4 class="text-nuxt-text text-xs lg:text-body-sm font-medium text-center">Background</h4>
              <div class="w-full h-10 lg:h-12 bg-nuxt-background border border-gray-600 rounded flex items-center justify-center">
                <span class="text-nuxt-text text-xs lg:text-caption">#060B1E</span>
              </div>
            </div>
            
            <!-- Button/Green -->
            <div class="space-y-2">
              <h4 class="text-nuxt-text text-xs lg:text-body-sm font-medium text-center">Button</h4>
              <div class="w-full h-10 lg:h-12 bg-nuxt-button rounded flex items-center justify-center">
                <span class="text-white text-xs lg:text-caption">#01A767</span>
              </div>
            </div>
            
            <!-- Text -->
            <div class="space-y-2">
              <h4 class="text-nuxt-text text-xs lg:text-body-sm font-medium text-center">Text</h4>
              <div class="w-full h-10 lg:h-12 bg-white rounded flex items-center justify-center">
                <span class="text-gray-800 text-xs lg:text-caption">#FFFFFF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Font Weights Demo -->
      <section class="mb-8 lg:mb-16">
        <div class="card">
          <h3 class="text-nuxt-text mb-4 lg:mb-6 text-center lg:text-left">Font Weights with Public Sans</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <p class="font-light text-nuxt-text text-body-base lg:text-body-lg mb-2 text-center lg:text-left">Light (300)</p>
              <p class="font-normal text-nuxt-text text-body-base lg:text-body-lg mb-2 text-center lg:text-left">Normal (400)</p>
              <p class="font-medium text-nuxt-text text-body-base lg:text-body-lg mb-2 text-center lg:text-left">Medium (500)</p>
              <p class="font-semibold text-nuxt-text text-body-base lg:text-body-lg mb-2 text-center lg:text-left">Semibold (600)</p>
            </div>
            <div>
              <p class="font-bold text-nuxt-text text-body-base lg:text-body-lg mb-2 text-center lg:text-left">Bold (700)</p>
              <p class="font-extrabold text-nuxt-text text-body-base lg:text-body-lg mb-2 text-center lg:text-left">Extrabold (800)</p>
              <p class="tracking-tight text-nuxt-text text-body-base lg:text-body-lg mb-2 text-center lg:text-left">Tight Spacing</p>
              <p class="tracking-wide text-nuxt-text text-body-base lg:text-body-lg mb-2 text-center lg:text-left">Wide Spacing</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Components -->
      <section class="mb-8 lg:mb-16">
        <div class="card">
          <h3 class="text-nuxt-text mb-4 lg:mb-6 text-center lg:text-left">Interactive Components</h3>
          <div class="space-y-4 lg:space-y-6">
            <!-- Buttons Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              <button class="btn-primary">
                Primary Action
              </button>
              <button class="btn-secondary">
                Secondary Action
              </button>
              <button class="bg-gray-600 hover:bg-gray-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-colors text-sm lg:text-base">
                Tertiary Action
              </button>
            </div>

            <!-- Input Example -->
            <div class="mt-4 lg:mt-6">
              <label class="block text-nuxt-text text-xs lg:text-body-sm font-medium mb-2 text-center lg:text-left">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="your@email.com"
                class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-gray-800 border border-gray-600 rounded-lg text-nuxt-text placeholder-gray-400 focus:border-nuxt-button focus:ring-1 focus:ring-nuxt-button outline-none transition-colors text-sm lg:text-base"
              >
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// Configuração da página
useHead({
  title: 'Typography & Colors Demo - Nuxt Project',
  meta: [
    { name: 'description', content: 'Demonstração das cores e tipografia baseadas no site oficial do Nuxt' }
  ]
})
</script>