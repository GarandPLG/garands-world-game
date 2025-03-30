import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const tradeDealFormSchema = toTypedSchema(
	z
		.object({
			product: z.nativeEnum(TradesProductOptions, {
				required_error: 'Produkt jest wymagany',
				invalid_type_error: 'Produkt musi być wybrany z listy'
			}),
			turn: z.string({
				required_error: 'Tura jest wymagana',
				invalid_type_error: 'Nieprawidłowy format tury'
			}),
			importState: z.string({
				required_error: 'Państwo importujące jest wymagane',
				invalid_type_error: 'Nieprawidłowy format państwa importującego'
			}),
			exportState: z.string({
				required_error: 'Państwo eksportujące jest wymagane',
				invalid_type_error: 'Nieprawidłowy format państwa eksportującego'
			}),
			volume: z
				.number({
					required_error: 'Ilość jest wymagana',
					invalid_type_error: 'Nieprawidłowy format ilości'
				})
				.min(1)
				.default(50),
			price: z
				.number({
					required_error: 'Cena jest wymagana',
					invalid_type_error: 'Nieprawidłowy format ceny'
				})
				.min(1)
				.default(50),
			isDiscontinued: z.boolean().default(false)
		})
		.refine(data => data.importState !== data.exportState, {
			message: 'Państwo importujące i eksportujące nie mogą być takie same',
			path: ['importState']
		})
);
