<template>
  <!-- Login Form -->
  <vee-form @submit="login" :validation-schema="loginSchema">
    <!-- alert -->
    <div
      v-if="login_show_alert"
      :class="login_alert_variant"
      class="text-white text-center font-bold p-4 rounded mb-4"
    >
      {{ login_alert_message }}
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_form.email') }}</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('login_form.email_place')"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_form.password') }}</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('login_form.password_place')"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      :disabled="login_in_submission"
      type="submit"
      class="block w-full bg-slate-800 text-white py-1.5 px-3 rounded transition hover:bg-slate-900"
    >
      {{ $t('login_form.btn') }}
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|min:3|max:100|email',
        password: 'required|min:3|max:100'
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_message: 'please wait,we are logging you in.'
    }
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async login(values) {
      console.log('values', values)
      this.login_in_submission = true
      this.login_show_alert = true
      this.login_alert_variant = 'bg-blue-500'
      this.login_alert_message = 'please wait ! your account is being created.'
      try {
        await this.authenticate(values)
      } catch (error) {
        this.login_in_submission = false
        this.login_alert_variant = 'bg-red-500'
        this.login_alert_message = 'Invalid login details.'
        return
      }

      this.login_alert_variant = 'bg-green-500'
      this.login_alert_message = 'Success, your are now logged in'
      window.location.reload()
    }
  }
}
</script>
