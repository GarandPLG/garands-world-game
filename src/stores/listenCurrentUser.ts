import type { AuthModel } from 'pocketbase'

const pb = usePocketBase()

export const listenCurrentUser = defineStore('listenCurrentUser', () => {
  const currentUser = ref<AuthModel | null>(null)

  function setCurrentUser(user: AuthModel | null) {
    currentUser.value = user
  }

  function initCurrentUser() {
    setCurrentUser(pb.authStore.model)
  }

  function listenCurrentUserChange() {
    pb.authStore.onChange((user) => {
      setCurrentUser(pb.authStore.model)
    })
  }

  return { currentUser, initCurrentUser, setCurrentUser, listenCurrentUserChange }
})
