<script setup lang="ts">
import { Icon } from '@iconify/vue';
useHead({
	title: "Garand's WG"
});
</script>

<template>
	<div class="mt-6 flex h-screen flex-col items-center justify-center">
		<h1 class="mb-4 text-3xl font-bold">
			Witaj na <span class="text-primary">Garandowym WG</span>!
		</h1>

		<p class="mb-4 text-sm">Wersja: <span class="text-primary">0.0.37 Indev</span></p>

		<div class="mb-4 flex flex-wrap justify-center">
			<a
				href="https://metalhead.club/@Garand_PLG"
				target="_blank"
				class="mr-4 flex items-center gap-1 text-blue-500 hover:text-blue-700"
			>
				<Icon icon="simple-icons:mastodon" width="24" height="24" class="mr-2 text-primary" />
				Mój profil na Mastodonie
			</a>

			<a
				href="https://www.youtube.com/@Garand_PLG"
				target="_blank"
				class="mr-4 flex items-center gap-1 text-blue-500 hover:text-blue-700"
			>
				<Icon icon="line-md:youtube" width="24" height="24" class="mr-1 text-primary" />
				Mój kanał na YouTube
			</a>
		</div>

		<div class="mb-4 flex flex-wrap justify-center">
			<a
				href="https://gitea.garandplg.com/GarandPLG/garands-world-game"
				target="_blank"
				class="mr-4 flex items-center gap-1 text-blue-500 hover:text-blue-700"
			>
				<Icon icon="simple-icons:gitea" width="24" height="24" class="mr-2 text-primary" />
				Kod źródłowy na Gitea
			</a>

			<a
				href="https://discord.gg/vhBmFVpR3w"
				target="_blank"
				class="mr-4 flex items-center gap-1 text-blue-500 hover:text-blue-700"
			>
				<Icon icon="simple-icons:discord" width="24" height="24" class="mr-2 text-primary" />
				Dołącz do serwera Discord!
			</a>
		</div>
	</div>
</template>
