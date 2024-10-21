import type { ThemeColors, ThemeRadiuses } from '@/types/theme-types';

export const useThemeStore = defineStore('useThemeStore', () => {
	const currentColorTheme = ref<ThemeColors>('Zinc');

	const currentRadius = ref<ThemeRadiuses>('0.5');

	const initThemeStore = () => {
		const storedTheme = localStorage.getItem('theme');

		if (storedTheme) {
			const theme = JSON.parse(storedTheme);
			currentColorTheme.value = theme.color;
			currentRadius.value = theme.radius;
		}
	};

	const saveThemeStore = () => {
		const theme = {
			color: currentColorTheme.value,
			radius: currentRadius.value
		};

		localStorage.setItem('theme', JSON.stringify(theme));
	};

	const clearThemeStore = () => {
		localStorage.removeItem('theme');

		currentColorTheme.value = 'Zinc';
		currentRadius.value = '0.5';
	};

	return {
		currentColorTheme,
		currentRadius,
		initThemeStore,
		saveThemeStore,
		clearThemeStore
	};
});
