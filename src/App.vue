<script setup lang="ts">
import { setGlobalColorTheme } from '@/lib/theme-colors';
import { setGlobalRadius } from '@/lib/theme-radius';
import type { ThemeColors, ThemeRadiuses } from '@/types/theme-types';
import { Icon } from '@iconify/vue';

const themeStore = useThemeStore();
const mode = useColorMode();

onMounted(() => {
	themeStore.initThemeStore();

	setGlobalColorTheme(
		mode.value as Exclude<typeof mode.value, 'auto'>,
		themeStore.currentColorTheme as ThemeColors
	);
	setGlobalRadius(themeStore.currentRadius as ThemeRadiuses);
});
</script>

<template>
	<header>
		<NavigationBar />
	</header>

	<main>
		<Suspense>
			<template #default>
				<RouterView />
			</template>

			<template #fallback>
				<div class="flex h-screen items-center justify-center">
					<Icon icon="svg-spinners:blocks-wave" class="h-1/2 w-1/2" />
				</div>
			</template>
		</Suspense>

		<Toaster />
	</main>
</template>

<style scoped></style>
