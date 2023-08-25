import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'
export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register() {
      const userCredential = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      )
      await usersCollection.doc(userCredential.user.uid).set({
        name: values.name,
        age: values.age,
        email: values.email,
        country: values.country
      })
      await userCredential.user.updateProfile({
        displayName: values.name
      })
      this.userLoggedIn = true
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password)
      this.userLoggedIn = true
    },
    async signOut() {
      await auth.signOut()
      this.userLoggedIn = false
    }
  }
})
