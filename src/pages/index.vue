<script setup lang="ts">
import { Icon } from '@iconify/vue';
const pb = usePocketBase();
</script>

<template>
	<div class="mt-6 flex flex-col items-center justify-center h-screen">
		<h1 class="text-3xl font-bold mb-4">Witaj na Garandowym WG!</h1>

		<p class="text-sm mb-4">Wersja: 0.0.6 Indev</p>

		<a
			href="https://discord.gg/vhBmFVpR3w"
			target="_blank"
			class="text-blue-500 hover:text-blue-700 mb-4 flex items-center gap-1"
		>
			<Icon icon="simple-icons:discord" width="24" height="24" class="mr-2" />
			Dołącz do serwera Discord!
		</a>

		<div class="flex flex-wrap justify-center mb-4">
			<a
				href="https://gitea.garandplg.com/GarandPLG/garands-world-game"
				target="_blank"
				class="text-blue-500 hover:text-blue-700 mr-4 flex items-center gap-1"
			>
				<Icon icon="simple-icons:gitea" width="24" height="24" class="mr-2" />
				Kod źródłowy na Gitea
			</a>

			<a
				href="https://www.youtube.com/channel/UCnYj9HJDMVuq2Qa9jsnLljA"
				target="_blank"
				class="text-blue-500 hover:text-blue-700 mr-4 flex items-center gap-1"
			>
				<Icon icon="line-md:youtube" width="24" height="24" class="mr-1" />
				Mój kanał na YouTube
			</a>
		</div>
	</div>
</template>
