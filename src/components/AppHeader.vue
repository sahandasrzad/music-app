<template>
  <!-- Header -->
  <header id="header" class="bg-slate-900">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link class="text-white mr-4 mt-1" to="/" exact-active-class="no-active"
        >Home</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <router-link class="px-2 text-white" to="/about">About</router-link>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" to="/manage">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">logout</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <a href="#" class="px-2 text-white" @click.prevent="changeLocale">
            {{ currentLocale }}
          </a>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapStores, mapState, mapWritableState } from 'pinia'
import userModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'
export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(userModalStore, useUserStore),
    ...mapWritableState(userModalStore, ['isOpen']),
    currentLocale() {
      return this.$i18n.locale === 'fa' ? 'persian' : 'english'
    }
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
      console.log('this.modalStore.isOpen ----->', this.modalStore.isOpen)
    },
    signOut() {
      this.userStore.signOut()
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' })
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'fa' ? 'en' : 'fa'
    }
  }
}
</script>
