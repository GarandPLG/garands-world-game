import type { Radius, ThemeRadiuses } from '@/types/theme-types';

const radiuses: Radius = {
	'0': '0rem',
	'0.25': '0.25rem',
	'0.5': '0.5rem',
	'0.75': '0.75rem',
	'1': '1rem'
};

function setGlobalRadius(selectedRadius: ThemeRadiuses): void {
	const radius = radiuses[selectedRadius];

	document.documentElement.style.setProperty('--radius', radius);
}

export { radiuses, setGlobalRadius };
