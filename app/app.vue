<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
/* Importar fonte Public Sans do Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800&display=swap');

/* Reset e configurações globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Public Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  background-color: #060B1E;
  color: #FFFFFF;
}

/* Estilos dos cards */
.card {
  @apply bg-nuxt-primary border border-gray-700 rounded-lg p-4 lg:p-6;
}

/* Estilos dos botões */
.btn-primary {
  @apply bg-nuxt-button hover:bg-green-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl;
}

.btn-secondary {
  @apply bg-transparent border-2 border-nuxt-button text-nuxt-button hover:bg-nuxt-button hover:text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-all duration-200;
}

/* Texto com gradiente */
.text-gradient {
  @apply text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Estilos responsivos para texto */
h1 {
  @apply text-hero;
}

h2 {
  @apply text-heading-xl;
}

h3 {
  @apply text-heading-lg;
}

h4 {
  @apply text-heading-md;
}

h5 {
  @apply text-heading-sm;
}

/* Scrollbar customizada */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #050A1D;
}

::-webkit-scrollbar-thumb {
  background: #01A767;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #018f5a;
}
</style>
