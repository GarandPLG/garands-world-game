<script lang="ts" setup>
import { FormField } from '@/components/ui/form';
import { useForm } from 'vee-validate';

const pb = usePocketBase();
const router = useRouter();
const { setCurrentUser } = listenCurrentUserStore();
const { toast } = useToast();
const { currentUser } = storeToRefs(listenCurrentUserStore());

if (currentUser.value) router.push('/');

const { handleSubmit } = useForm({
	validationSchema: loginFormSchema
});

const onSubmit = handleSubmit(async values => {
	await pb
		.collection('users')
		.authWithPassword(values.username, values.password)
		.catch((error: unknown) => {
			toast({
				title: `Błąd przy logowaniu się!`,
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		});

	setCurrentUser(pb.authStore.model);

	toast({
		title: 'Udało się zalogować!'
	});

	router.push('/');
});

useHead({
	title: "Garand's WG | Zaloguj się"
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

					<Button as-child variant="link">
						<a href="/reset-password"> Zapomniałem hasła </a>
					</Button>

					<CardFooter>
						<Button class="w-full" type="submit"> Zaloguj się </Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	</div>
</template>
