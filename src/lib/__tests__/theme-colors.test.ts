import { describe, expect, it, vi } from 'vitest';
import { setGlobalColorTheme, themes } from '@/lib/theme-colors';

describe('setGlobalColorTheme', () => {
	it('powinna ustawić motyw kolorów dla aplikacji', () => {
		const mockSetProperty = vi.fn();
		document.documentElement.style.setProperty = mockSetProperty;

		setGlobalColorTheme('light', 'Violet');

		expect(mockSetProperty).toHaveBeenCalledTimes(Object.keys(themes.Violet.light).length);
	});

	it('powinna rzucać błąd, gdy niepoprawny motyw kolorów', () => {
		expect(() => setGlobalColorTheme('niepoprawny', 'Violet')).toThrowError(
			'Niepoprawny motyw kolorów. Dostępne motywy to: light, dark'
		);
	});

	it('powinna rzucać błąd, gdy niepoprawna nazwa koloru', () => {
		expect(() => setGlobalColorTheme('light', 'niepoprawny')).toThrowError(
			'Niepoprawna nazwa koloru. Dostępne nazwy kolorów to: Violet, ...'
		);
	});
});

describe('themes', () => {
	it('powinien zawierać wszystkie niezbędne właściwości', () => {
		expect(themes).toHaveProperty('Violet');
		expect(themes.Violet).toHaveProperty('light');
		expect(themes.Violet).toHaveProperty('dark');
	});
});
