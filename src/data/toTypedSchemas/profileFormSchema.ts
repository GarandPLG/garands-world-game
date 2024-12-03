import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const profileFormSchema = toTypedSchema(
	z.object({
		username: z.string().min(2).max(50), // .default(currentUser.value!.username),
		email: z.string().email(), // .default(currentUser.value!.email),
		oldPassword: z.string().min(10).max(72),
		password: z.string().min(10).max(72).optional(),
		passwordConfirm: z.string().min(10).max(72).optional()
	})
);
