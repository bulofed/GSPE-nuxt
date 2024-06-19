import { defineStore } from 'pinia'
import type { IUser } from '~/types'

export const useUserStore = defineStore({
  id: 'myUserStore',
  state: () => ({
    users: [] as IUser[]
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await $fetch<IUser[]>('/api/user/all-users', {
          method: 'GET'
        })
        if (response) {
          this.users = response as IUser[]
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
      return this.users
    },
    async fetchUser(id: string) {
      try {
        const response = await $fetch<IUser>(`/api/user/${id}`, {
          method: 'GET'
        })
        if (response) {
          return response as IUser
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    },
    async toggleAdmin(user: IUser) {
      try {
        const id = user._id
        const response = await $fetch<IUser>(`/api/user/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            isAdmin: user!.isAdmin
          })
        })
        if (response) {
          return response as IUser
        }
      } catch (error) {
        console.error('Failed to toggle admin:', error)
      }
    }
  }
})
