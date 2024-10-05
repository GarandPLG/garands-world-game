<script setup lang="ts">
const pb = usePocketBase()

console.log(pb)

console.log(await pb.collection('users').getFullList())
</script>

<template>
  <main>
    <div>
      <p>Jeżyk</p>
      <Button>Jeżyk</Button>
    </div>
  </main>
</template>
