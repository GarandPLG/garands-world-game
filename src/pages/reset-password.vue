<script lang="ts" setup>
useHead({
	title: "Garand's WG | Resetowanie hasła"
});

import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { FormField } from '@/components/ui/form';

const pb = usePocketBase();
const router = useRouter();
const { toast } = useToast();
const { currentUser } = storeToRefs(listenCurrentUserStore());

if (currentUser.value) router.push('/');

const { handleSubmit } = useForm({
	validationSchema: toTypedSchema(
		z.object({
			email: z.string().email()
		})
	)
});

const onSubmit = handleSubmit(async values => {
	await pb
		.collection('users')
		.requestPasswordReset(values.email)
		.catch((error: unknown) => {
			toast({
				title: `Błąd przy wypełnianiu formularza!`,
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		});

	toast({
		title: 'Mail z resetem hasła został wysłany!',
		description: 'Sprawdź swoją skrzynkę pocztową.'
	});

	router.push('/login');
});
</script>

<template>
	<div class="flex h-screen items-center justify-center">
		<Card class="w-1/4">
			<CardHeader class="space-y-1">
				<CardTitle class="text-2xl"> Resetowanie hasła </CardTitle>

				<CardDescription> Podaj email konta, do którego chcesz zresetować hasło </CardDescription>
			</CardHeader>

			<CardContent class="grid gap-6">
				<Separator label="" />

				<form @submit.prevent="onSubmit" class="grid gap-3">
					<FormField v-slot="{ componentField }" name="email">
						<FormItem>
							<FormLabel>Email</FormLabel>

							<FormControl>
								<Input type="email" placeholder="Email" v-bind="componentField" />
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>

					<CardFooter>
						<Button class="w-full" type="submit"> Zaloguj się </Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	</div>
</template>
