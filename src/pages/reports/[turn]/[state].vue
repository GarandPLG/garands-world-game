<script lang="ts" setup>
import type { AuthModel } from 'pocketbase';

const route = useRoute();
const router = useRouter();

const pb = usePocketBase();
const { toast } = useToast();
const { currentUser } = storeToRefs(listenCurrentUserStore());

const turn = computed<string>(() => route.params.turn - 1);
const state = computed<string>(() => route.params.state);
const user = computed<AuthModel | null>(() =>
	currentUser.value ? `"${currentUser.value?.id}"` : null
);

// TODO: Jeżeli niezalogowany to nie wykonuj fetcha
if (!user.value) {
	router.push('/');
} else {
	const turnQuery = computed(() => `value = "${turn.value}"`);

	const turnData = await pb
		.collection('turns')
		.getFirstListItem(turnQuery.value)
		.catch((error: unknown) => {
			toast({
				title: `Błąd przy pobieraniu tury ${turn.value}!`,
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		});

	const stateQuery = computed(() => {
		const baseQuery = `name = "${state.value}" && turn = "${turnData.id}"`;
		return currentUser.value?.role === 'moderator' || currentUser.value?.role === 'admin'
			? baseQuery
			: `${baseQuery} && user = ${user.value}`;
	});
	console.log(stateQuery.value);

	const stateData = await pb
		.collection('states')
		.getFirstListItem(stateQuery.value)
		.catch((error: unknown) => {
			toast({
				title: `Błąd przy pobieraniu state ${state.value}!`,
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		});

	console.log(stateData);
}

useHead({
	title: `Garand's WG | Raport | Tura ${turn.value} | ${state.value}`
});
</script>

<template></template>
