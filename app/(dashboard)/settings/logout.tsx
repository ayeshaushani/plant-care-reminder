import { useEffect } from "react"
import { auth } from "@/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "expo-router"

const LogoutScreen = () => {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      await signOut(auth)
      router.replace("/login")
    }
    logout()
  }, [])

  return null
}

export default LogoutScreen
