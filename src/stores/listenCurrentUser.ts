import type { AuthModel } from 'pocketbase'

const pb = usePocketBase()

export const listenCurrentUser = defineStore('listenCurrentUser', () => {
  const currentUser = ref<AuthModel | null>(null)

  function setCurrentUser(user: AuthModel | null) {
    console.log('setCurrentUser', user)
    currentUser.value = user
  }

  function initCurrentUser() {
    console.log('initCurrentUser', pb.authStore.model)
    setCurrentUser(pb.authStore.model)
  }

  function listenCurrentUserChange() {
    pb.authStore.onChange((user) => {
      console.log('listenCurrentUserChange', user)
      setCurrentUser(pb.authStore.model)
    })
  }

  return { currentUser, initCurrentUser, setCurrentUser, listenCurrentUserChange }
})
