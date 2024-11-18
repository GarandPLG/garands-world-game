<script lang="ts" setup>
// TODO: Raport danego kraju z danej tury
const route = useRoute();
useHead({
	title: `Garand's WG | Raport | Tura ${route.params.turn} | ${route.params.state}`
});

const pb = usePocketBase();

const turn = await pb
	.collection('turns')
	.getFirstListItem(`value = "${route.params.turn}"`)
	.catch(error => {
		// TODO: W podobnym stylu zrobić pozostałe fetche z trycatch
		if (error instanceof Error) throw error;
		else console.error(`Błąd przy pobieraniu tury ${route.params.turn}:`, 'Nieznany błąd.');
	});

const state = await pb
	.collection('states')
	.getFirstListItem(`name = "${route.params.state}" && turn = "${turn.id}"`)
	.catch(error => {
		if (error instanceof Error) throw error;
		else console.error(`Błąd przy pobieraniu state ${route.params.state}:`, 'Nieznany błąd.');
	});

console.log(state);
</script>

<template></template>
