import { radiuses, setGlobalRadius } from '@/lib/theme-radius';
import { describe, expect, it, vi } from 'vitest';

describe('theme-radius.ts', () => {
	describe('radiuses', () => {
		it('powinien zawierać poprawne wartości promienia', () => {
			expect(radiuses).toEqual({
				'0': '0rem',
				'0.25': '0.25rem',
				'0.5': '0.5rem',
				'0.75': '0.75rem',
				'1': '1rem'
			});
		});
	});

	describe('setGlobalRadius', () => {
		it('powinien ustawić właściwość --radius w stylach dokumentu', () => {
			const setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty');
			setGlobalRadius('0.5');
			expect(setPropertySpy).toHaveBeenCalledTimes(1);
			expect(setPropertySpy).toHaveBeenCalledWith('--radius', '0.5rem');
		});

		it('powinien nie ustawić właściwości --radius, jeśli podana wartość nie istnieje w radiuses', () => {
			const setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty');
			setGlobalRadius('2' as any);
			expect(setPropertySpy).not.toHaveBeenCalled();
		});
	});
});
