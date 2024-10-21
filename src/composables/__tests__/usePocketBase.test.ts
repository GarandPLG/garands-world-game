import usePocketBase from '@/composables/usePocketBase';
import PocketBase from 'pocketbase';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('pocketbase', () => {
	return {
		default: vi.fn().mockImplementation(() => ({
			autoCancellation: vi.fn().mockReturnThis()
		}))
	};
});

describe('usePocketBase', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('powinien utworzyć nową instancję PocketBase z prawidłowym URL bazowym', () => {
		const pb = usePocketBase();
		expect(PocketBase).toHaveBeenCalledWith('/pb');
	});

	it('powinien wyłączyć automatyczne anulowanie', () => {
		const pb = usePocketBase();
		expect(pb.autoCancellation).toHaveBeenCalledWith(false);
	});

	it('powinien zwrócić instancję tego samego typu co TypedPocketBase', () => {
		const pb = usePocketBase();
		expect(pb).toBeDefined();
		expect(pb).toHaveProperty('autoCancellation');
	});

	it('powinien zachować możliwość łączenia metod', () => {
		const pb = usePocketBase();
		expect(pb.autoCancellation(false)).toBe(pb);
	});

	it('powinien zgłosić błąd przy nieprawidłowym URL bazowym', () => {
		vi.mocked(PocketBase).mockImplementationOnce(() => {
			throw new Error('Invalid URL');
		});

		expect(() => usePocketBase()).toThrow('Invalid URL');
	});

	it('powinien tworzyć nową instancję przy każdym wywołaniu', () => {
		const pb1 = usePocketBase();
		const pb2 = usePocketBase();
		expect(pb1).not.toBe(pb2);
	});
});
