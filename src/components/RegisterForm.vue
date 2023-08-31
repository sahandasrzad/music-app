<template>
  <!-- Registration Form -->
  <vee-form @submit="register" :validation-schema="schema" :initial-values="userData">
    <div
      v-if="registeration_show_alert"
      :class="registeration_alert_variant"
      class="text-white text-center font-bold p-4 rounded mb-4"
    >
      {{ registeration_alert_message }}
    </div>
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.name') }}</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register_form.name_place')"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.email') }}</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register_form.email_place')"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.age') }}</label>
      <vee-field
        type="number"
        name="age"
        :placeholder="$t('register_form.age_place')"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <!-- multiple error ErrorMessage handling -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.password') }}</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          v-bind="field"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          :placeholder="$t('register_form.password_place')"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
      </vee-field>
      <!-- <ErrorMessage class="text-red-600" name="password" /> -->
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.co_password') }}</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register_form.co_password_place')"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.country') }}</label>
      <vee-field
        as="select"
        name="country"
        :placeholder="$t('register_form.country_place')"
        class="block w-full py-1.5 px-3 transition duration-500 rounded selector"
      >
        <option value="USA" class="">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 border-slate-900 text-slate-900 focus:outline-slate-900 rounded"
      />
      <label class="inline-block">{{ $t('register_form.term') }}</label>
      <ErrorMessage class="text-red-600 block" name="tos" />
    </div>
    <button
      :disabled="registeration_in_submission"
      type="submit"
      class="block w-full bg-slate-800 text-white py-1.5 px-3 rounded transition hover:bg-slate-900"
    >
      {{ $t('register_form.btn') }}
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'
export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:3|max:100|excluded:password',
        confirm_password: 'required|passwords_mismatch:@password',
        country: 'required|country_excluded:Germany',
        tos: 'tos'
      },
      userData: {
        country: 'USA'
      },
      registeration_in_submission: false,
      registeration_show_alert: false,
      registeration_alert_variant: 'bg-blue-500',
      registeration_alert_message: 'please wait,your account is being created.'
    }
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: 'register'
    }),
    async register(values) {
      this.registeration_in_submission = true
      this.registeration_show_alert = true
      this.registeration_alert_variant = 'bg-blue-500'
      this.registeration_alert_message = 'please wait ! your account is being created.'

      try {
        await this.createUser(values)
      } catch (error) {
        console.log('register --> error --->  ', error)
        this.registeration_in_submission = false
        this.registeration_alert_variant = 'bg-red-500'
        this.registeration_alert_message = 'An unexpted error occured. please try again later.'
        return
      }

      this.registeration_alert_variant = 'bg-green-500'
      this.registeration_alert_message = 'Success, your account has been created'
      window.location.reload()
    }
  }
}
</script>
