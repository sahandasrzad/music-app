<template>
  <div class="relative isolate overflow-hidden h-screen -pt-10">
    <div
      style="background-image: url(/assets/img/sahand.jpg)"
      class="absolute inset-0 -z-10 w-full bg-no-repeat bg-center bg-cover bg-local bg-gray-700"
    ></div>

    <div
      class="mx-auto my-auto flex flex-col items-start justify-center max-w-7xl px-6 lg:px-8 absolute inset-6 backdrop-blur-sm h-4/5 bg-white/30"
    >
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl">Sahand Asrzad</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Thank you for visiting this program, This app is made for testing purpose only
        </p>
      </div>
      <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
        <div
          class="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-gray-900 sm:grid-cols-2 md:flex lg:gap-x-10"
        >
          <a v-for="link in links" :key="link.name" :href="link.href" target="_blank"
            >{{ link.name }} <span aria-hidden="true">&rarr;</span>
            <i class="text-xl fab ml-2" :class="link.icon"></i
          ></a>
        </div>
        <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4"></dl>
      </div>
    </div>
  </div>
</template>

<script setup>
const links = [
  { name: 'github', href: 'https://github.com/sahandasrzad', icon: 'fa-github' },
  { name: 'linkedin', href: 'https://www.linkedin.com/in/sahand-asrzad/', icon: 'fa-linkedin' },
  { name: 'telegram', href: 'https://t.me/sahandasrzad', icon: 'fa-telegram' },
  { name: 'instagram', href: 'https://www.instagram.com/sahand_asrzad', icon: 'fa-instagram' }
]
</script>
