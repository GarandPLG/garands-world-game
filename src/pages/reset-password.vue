<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { FormField } from '@/components/ui/form';

const pb = usePocketBase();
const router = useRouter();
const { toast } = useToast();
const { currentUser } = listenCurrentUser();

onMounted(() => {
	if (currentUser) router.push('/');
});

const { handleSubmit } = useForm({
	validationSchema: toTypedSchema(
		z.object({
			email: z.string().email()
		})
	)
});

const onSubmit = handleSubmit(async values => {
	try {
		await pb.collection('users').requestPasswordReset(values.email);

		toast({
			title: 'Mail z resetem hasła został wysłany!',
			description: 'Sprawdź swoją skrzynkę pocztową.'
		});

		router.push('/login');
	} catch (error: unknown) {
		if (error instanceof Error)
			toast({
				title: 'Błąd przy wypełnianiu formularza!',
				description: `${error.name}: ${error.message}`
			});
		else
			toast({
				title: 'Błąd przy wypełnianiu formularza!',
				description: 'Nieznany błąd.'
			});
	}
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
