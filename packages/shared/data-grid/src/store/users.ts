import { create } from 'zustand'

import { User } from '../types/user'
import { fetchUsers } from '../utils/actions'
import { handleError } from '../utils/errorHandler'

type UserStore = {
  loadingUsers: boolean
  users: User[]
  setLoadingUsers: (loadingUsers: boolean) => void
  setUsers: (users: User[]) => void
}

export const useUserStore = create<UserStore>((set) => ({
  loadingUsers: false,
  users: [],
  setLoadingUsers: (loadingUsers: boolean) => set(() => ({ loadingUsers })),
  setUsers: (users: User[]) => set(() => ({ users })),
}))

/**
 * Fetches users initially
 * @returns {Promise<void>}
 */
export const fetchUsersInitially = async (): Promise<void> => {
  const { users, loadingUsers, setUsers, setLoadingUsers } =
    useUserStore.getState()
  if (users.length || loadingUsers) return

  try {
    setLoadingUsers(true)
    const data = await fetchUsers()
    setUsers(data)
  } catch (error) {
    handleError(error as Error)
  } finally {
    setLoadingUsers(false)
  }
}
