<template>
  <app-header></app-header>

  <router-view v-slot="{ Component }">
    <transition name="fade-view" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- <router-view v-slot="{ Component }">
    <transition name="scale-slide">
      <component :is="Component" />
    </transition>
  </router-view> -->

  <app-player />
  <app-auth />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/AppAuth.vue'
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/user'
import { auth } from '@/includes/firebase'
import AppPlayer from '@/components/Player.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
    AppPlayer
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<style>
.fade-view-enter-from {
  opacity: 0;
}
.fade-view-enter-active {
  transition: all 0.5s linear;
}
.fade-view-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
