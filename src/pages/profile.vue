<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { FormField } from '@/components/ui/form';

const pb = usePocketBase();
const router = useRouter();

const { toast } = useToast();
const { currentUser } = storeToRefs(listenCurrentUser());
const { setCurrentUser } = listenCurrentUser();

if (!currentUser.value) router.push('/');

useHead({
	title: () => `Garand's WG | Profil użytkownika ${currentUser.value!.username}`
});

const { handleSubmit } = useForm({
	validationSchema: toTypedSchema(
		z.object({
			username: z.string().min(2).max(50).default(currentUser.value!.username),
			email: z.string().email().default(currentUser.value!.email),
			oldPassword: z.string().min(10).max(72),
			password: z.string().min(10).max(72).optional(),
			passwordConfirm: z.string().min(10).max(72).optional()
		})
	)
});

const onSubmit = handleSubmit(async values => {
	if (values.password !== values.passwordConfirm) {
		toast({
			title: 'Hasła nie są identyczne!',
			description: 'Wprowadź to samo hasło w obu polach.'
		});

		return;
	}

	try {
		interface UserData {
			username: string;
			email: string;
			oldPassword: string;
			password?: string;
			passwordConfirm?: string;
			verified: boolean;
		}

		const userData: UserData = {
			username: values.username,
			email: values.email,
			oldPassword: values.oldPassword,
			verified: true
		};

		if (values.email !== currentUser.value!.email) {
			userData.verified = false;
		}

		if (values.password) {
			userData.password = values.password;
			userData.passwordConfirm = values.passwordConfirm;
		} else {
			userData.password = values.oldPassword;
			userData.passwordConfirm = values.oldPassword;
		}

		await pb.collection('users').update(pb.authStore.model!.id, userData);

		if (values.email !== currentUser.value!.email) {
			await pb.collection('users').requestVerification(values.email);

			toast({
				title: 'Dane konta zostały zmienione!',
				description: 'Teraz na nowo musisz zweryfikować email, aby móc korzystać z aplikacji.'
			});

			pb.authStore.clear();

			router.push('/login');
		} else {
			toast({
				title: 'Dane konta zostały zmienione!'
			});

			setCurrentUser(pb.authStore.model);

			router.push('/');
		}
	} catch (error) {
		if (error instanceof Error)
			toast({
				title: 'Błąd przy zmienianiu danych konta!',
				description: `${error.name}: ${error.message}`
			});
		else
			toast({
				title: 'Błąd przy zmienianiu danych konta!',
				description: 'Nieznany błąd.'
			});
	}
});
</script>

<template>
	<div class="flex h-screen items-center justify-center">
		<Card class="w-1/4">
			<CardHeader class="space-y-1">
				<CardTitle class="text-2xl"> Edytuj profil </CardTitle>

				<CardDescription> Wypełnij formularz poniżej aby edytować swoje dane </CardDescription>
			</CardHeader>

			<CardContent class="grid gap-6">
				<Separator label="" />

				<form @submit.prevent="onSubmit" class="grid gap-3">
					<FormField v-slot="{ componentField }" name="username">
						<FormItem>
							<FormLabel>Nazwa użytkownika</FormLabel>

							<FormControl>
								<Input type="text" placeholder="Nazwa użytkownika" v-bind="componentField" />
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>

					<FormField v-slot="{ componentField }" name="email">
						<FormItem>
							<FormLabel>Email</FormLabel>

							<FormControl>
								<Input type="email" placeholder="Email" v-bind="componentField" />
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>

					<FormField v-slot="{ componentField }" name="oldPassword">
						<FormItem>
							<FormLabel>Stare hasło</FormLabel>

							<FormControl>
								<Input type="password" placeholder="Stare hasło" v-bind="componentField" />
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>

					<FormField v-slot="{ componentField }" name="password">
						<FormItem>
							<FormLabel>Nowe hasło</FormLabel>

							<FormControl>
								<Input type="password" placeholder="Nowe hasło" v-bind="componentField" />
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>

					<FormField v-slot="{ componentField }" name="passwordConfirm">
						<FormItem>
							<FormLabel>Potwierdź nowe hasło</FormLabel>

							<FormControl>
								<Input type="password" placeholder="Potwierdź nowe hasło" v-bind="componentField" />
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>

					<CardFooter>
						<Button disabled class="w-full" type="submit"> Zapisz zmiany </Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	</div>
</template>
