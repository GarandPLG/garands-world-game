<script lang="ts" setup>
useHead({
	title: "Garand's WG | Rejestracja"
});

import { useForm } from 'vee-validate';

import { FormField } from '@/components/ui/form';

const pb = usePocketBase();
const router = useRouter();
const { toast } = useToast();
const { currentUser } = storeToRefs(listenCurrentUserStore());

if (currentUser.value) router.push('/');

const { handleSubmit } = useForm({
	validationSchema: registerFormSchema
});

const onSubmit = handleSubmit(async values => {
	if (values.password !== values.passwordConfirm) {
		toast({
			title: 'Hasła nie są identyczne!',
			description: 'Wprowadź to samo hasło w obu polach.'
		});

		return;
	}

	const createUser = await pb
		.collection('users')
		.create({
			username: values.username,
			email: values.email,
			password: values.password,
			passwordConfirm: values.passwordConfirm,
			role: 'user'
		})
		.catch((error: unknown) => {
			toast({
				title: `Błąd przy tworzeniu konta!`,
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		});

	if (createUser) {
		await pb
			.collection('users')
			.requestVerification(values.email)
			.catch((error: unknown) => {
				toast({
					title: `Błąd przy wysyłaniu e-maila z weryfikacją!`,
					description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
				});
				if (error instanceof Error) throw error;
			});

		toast({
			title: 'Konto zostało utworzone!',
			description:
				'Aktywuj swoje konto klikając w link, który został wysłany na podany adres email.'
		});

		router.push('/login');
	}
});
</script>

<template>
	<div class="flex h-screen items-center justify-center">
		<Card class="w-1/4">
			<CardHeader class="space-y-1">
				<CardTitle class="text-2xl"> Stwórz konto </CardTitle>

				<CardDescription> Wypełnij formularz poniżej aby utworzyć konto </CardDescription>
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

					<FormField v-slot="{ componentField }" name="password">
						<FormItem>
							<FormLabel>Hasło</FormLabel>

							<FormControl>
								<Input type="password" placeholder="Hasło" v-bind="componentField" />
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>

					<FormField v-slot="{ componentField }" name="passwordConfirm">
						<FormItem>
							<FormLabel>Potwierdź hasło</FormLabel>

							<FormControl>
								<Input type="password" placeholder="Potwierdź hasło" v-bind="componentField" />
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>

					<CardFooter>
						<Button class="w-full" type="submit"> Utwórz konto </Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	</div>
</template>
