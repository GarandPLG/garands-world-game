<script lang="ts" setup>
const route = useRoute();

const sidebarNavItems: {
	title: string;
	href: string;
}[] = [
	{
		title: 'Przeglądanie Raportów',
		href: '/examples/forms'
	},
	{
		title: 'Koniec Tury',
		href: '/examples/forms/account'
	}
];
</script>

<template>
	<div class="hidden space-y-6 p-2 md:block">
		<div class="space-y-0.5">
			<h2 class="text-2xl font-bold tracking-tight"> Panel Administratora </h2>
			<p class="text-muted-foreground"> Panel dla moderatorów i adminów do zarządzania WG. </p>
		</div>

		<Separator class="my-6" />

		<Tabs
			:default-value="sidebarNavItems[0].title"
			class="flex w-full gap-4"
			orientation="vertical"
		>
			<TabsList class="grid h-1/2 w-1/6 grid-cols-1">
				<TabsTrigger :value="item.title" v-for="item in sidebarNavItems" :key="item.title">
					{{ item.title }}
				</TabsTrigger>
			</TabsList>

			<TabsContent
				:value="item.title"
				class="w-5/6"
				v-for="item in sidebarNavItems"
				:key="item.title"
			>
				<Card>
					<CardHeader>
						<CardTitle> {{ item.title }} </CardTitle>

						<CardDescription> </CardDescription>
					</CardHeader>

					<CardContent class="space-y-2"> </CardContent>

					<CardFooter> </CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</template>
