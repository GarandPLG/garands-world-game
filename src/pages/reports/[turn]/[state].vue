<script lang="ts" setup>
// TODO: Raport danego kraju z danej tury
const route = useRoute();
useHead({
	title: `Garand's WG | Raport | Tura ${route.params.turn} | ${route.params.state}`
});

const pb = usePocketBase();
const { toast } = useToast();

const turn = await pb
	.collection('turns')
	.getFirstListItem(`value = "${route.params.turn}"`)
	.catch((error: unknown) => {
		toast({
			title: `Błąd przy pobieraniu tury ${route.params.turn}!`,
			description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
		});
		if (error instanceof Error) throw error;
	});

const state = await pb
	.collection('states')
	.getFirstListItem(`name = "${route.params.state}" && turn = "${turn.id}"`)
	.catch((error: unknown) => {
		toast({
			title: `Błąd przy pobieraniu state ${route.params.state}!`,
			description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
		});
		if (error instanceof Error) throw error;
	});

console.log(state);
</script>

<template></template>
