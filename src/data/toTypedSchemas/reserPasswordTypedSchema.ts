import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const resetPasswordFormSchema = toTypedSchema(
	z.object({
		email: z.string().email()
	})
);
