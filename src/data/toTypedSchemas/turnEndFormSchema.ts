import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const turnEndFormSchema = toTypedSchema(
	// FIXME: Naprawić walidację zod'a dla pól plikowych
	z.object({
		turn: z.number(),
		statesCSV: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file), 'Tylko plik CSV jest dozwolony'),
		burgsCSV: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file), 'Tylko plik CSV jest dozwolony'),
		culturesCSV: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file), 'Tylko plik CSV jest dozwolony'),
		religionsCSV: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file), 'Tylko plik CSV jest dozwolony'),
		provincesCSV: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file), 'Tylko plik CSV jest dozwolony'),
		relationsCSV: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file), 'Tylko plik CSV jest dozwolony'),
		statesByNumberOfCellsGroupedByBiomeCSV: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file), 'Tylko plik CSV jest dozwolony'),
		statesByNumberOfCellsGroupedByReligionsCSV: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file), 'Tylko plik CSV jest dozwolony'),
		statesByNumberOfCellsGroupedByCulturesCSV: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file), 'Tylko plik CSV jest dozwolony'),
		religionsByNumberOfCellsCSV: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file), 'Tylko plik CSV jest dozwolony'),
		provincesByNumberOfCellsCSV: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file), 'Tylko plik CSV jest dozwolony'),
		emblemsHTML: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file, 'html'), 'Tylko plik HTML jest dozwolony'),
		map: z
			.any()
			.refine((file: File) => file?.size !== 0, 'File is required')
			.refine((file: File) => checkFileType(file, 'map'), 'Tylko plik MAP jest dozwolony')
	})
);

const checkFileType = (file: File, type = 'csv'): boolean =>
	file?.name && file.name.split('.').pop() === type ? true : false;
