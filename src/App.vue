<script setup lang="ts">
import { setGlobalColorTheme } from '@/lib/theme-colors';
import { setGlobalRadius } from '@/lib/theme-radius';
import type { ThemeColors, ThemeRadiuses } from '@/types/theme-types';

const themeStore = useThemeStore();
const mode = useColorMode();
themeStore.initThemeStore();

setGlobalColorTheme(
	mode.value as Exclude<typeof mode.value, 'auto'>,
	themeStore.currentColorTheme as ThemeColors
);
setGlobalRadius(themeStore.currentRadius as ThemeRadiuses);
</script>

<template>
	<header>
		<Suspense>
			<NavigationBar />

			<template #fallback>
				<div> <Label>Problem z kodem paska nawigacyjnego</Label> </div>
			</template>
		</Suspense>
	</header>

	<main>
		<Suspense>
			<RouterView />

			<template #fallback>
				<div class="flex h-screen items-center justify-center">
					<!-- <Icon icon="svg-spinners:blocks-wave" class="h-1/2 w-1/2" /> -->
					Ładuję stronę
				</div>
			</template>
		</Suspense>

		<Toaster />
	</main>
</template>

<style scoped></style>
