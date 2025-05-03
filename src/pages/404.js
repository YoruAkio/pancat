import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    async function Load() {
      try {
        router.push('/')
      } catch(e) {
        console.error(`Error(404): ${e}`)
      }
    }

    Load()
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl">Page not found</p>
    </div>
  )
}