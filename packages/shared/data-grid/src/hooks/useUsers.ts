import { useEffect } from 'react'

import { fetchUsersInitially, useUserStore } from '../store/users'

export default function useUsers() {
  const { loadingUsers, users } = useUserStore()

  useEffect(() => {
    // Fetching users on store to avoid multiple requests
    fetchUsersInitially()
  }, [])

  return { loadingUsers, users }
}
