<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { FormField } from '@/components/ui/form';

const pb = usePocketBase();
const router = useRouter();
const { setCurrentUser } = listenCurrentUser();
const { toast } = useToast();
const { currentUser } = listenCurrentUser();

if (currentUser) router.push('/');

const { handleSubmit } = useForm({
	validationSchema: toTypedSchema(
		z.object({
			username: z.string().min(2).max(50),
			password: z.string().min(10).max(72)
		})
	)
});

const onSubmit = handleSubmit(async values => {
	try {
		await pb.collection('users').authWithPassword(values.username, values.password);

		setCurrentUser(pb.authStore.model);

		toast({
			title: 'Udało się zalogować!'
		});

		router.push('/');
	} catch (error: unknown) {
		if (error instanceof Error)
			toast({
				title: 'Błąd przy logowaniu się!',
				description: `${error.name}: ${error.message}`
			});
		else
			toast({
				title: 'Błąd przy logowaniu się!',
				description: 'Nieznany błąd.'
			});
	}
});
</script>

<template>
	<div class="flex h-screen items-center justify-center">
		<Card class="w-1/4">
			<CardHeader class="space-y-1">
				<CardTitle class="text-2xl"> Zaloguj się</CardTitle>

				<CardDescription> Wprowadź swoje dane do logowania się </CardDescription>
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

					<FormField v-slot="{ componentField }" name="password">
						<FormItem>
							<FormLabel>Hasło</FormLabel>

							<FormControl>
								<Input type="password" placeholder="Hasło" v-bind="componentField" />
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>

					<NavigationMenuLink href="/reset-password" class="">
						Zapomniałem hasła
					</NavigationMenuLink>

					<CardFooter>
						<Button class="w-full" type="submit"> Zaloguj się </Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	</div>
</template>
