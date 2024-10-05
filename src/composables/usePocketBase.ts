import PocketBase from 'pocketbase'

export default function usePocketBase() {
  const pb = new PocketBase('/pb').autoCancellation(false)
  return pb
}
