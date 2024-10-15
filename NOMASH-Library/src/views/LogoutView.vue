<template>
  <h1>Logout</h1>
  <p>Current User: {{ currentUser ? currentUser.email : 'No user logged in' }}</p>
  <p>User Role: {{ userRole }}</p>
  <button @click="logout">Logout</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "vue-router"

const router = useRouter()
const auth = getAuth()
const currentUser = ref(null)
const userRole = ref('')

onMounted(() => {
  currentUser.value = auth.currentUser
  userRole.value = localStorage.getItem('userRole') || 'Not set'
  console.log("Current User:", currentUser.value)
  console.log("User Role:", userRole.value)
})

const logout = async () => {
  try {
    await signOut(auth)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
    console.log("User logged out successfully")
    router.push('/login')
  } catch (error) {
    console.log(error.code)
  }
}
</script>