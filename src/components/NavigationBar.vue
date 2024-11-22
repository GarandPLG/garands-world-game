<script setup lang="ts">
import type { StatesResponse, TurnsResponse } from '@/types/pb-types';
import { Icon } from '@iconify/vue';
import { navigationMenuTriggerStyle } from './ui/navigation-menu';

const { initCurrentUser, listenCurrentUserChange } = listenCurrentUserStore();
initCurrentUser();
listenCurrentUserChange();

const pb = usePocketBase();
const { toast } = useToast();

const { currentUser } = storeToRefs(listenCurrentUserStore());

const turn = ref<TurnsResponse<unknown>>();

try {
	turn.value = await pb
		.collection('turns')
		.getList(1, 1, { sort: '-value' })
		.then(response => response.items[0]);
} catch (error) {
	toast({
		title: 'Błąd przy pobieraniu tury!',
		description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
	});
	if (error instanceof Error) throw error;
}

const states = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>([]);

watch(currentUser, async () => {
	if (currentUser.value) {
		try {
			states.value = await pb.collection('states').getFullList({
				filter: `turn = "${turn.value?.id}" && user = "${currentUser.value.id}"`
			});
		} catch (error) {
			toast({
				title: `Błąd przy pobieraniu państw użytkownika ${currentUser.value.username}!`,
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			throw error;
		}
	} else states.value = [];
});

const pb_url = import.meta.env.PROD ? '/_/' : '/pb/_/';
</script>

<template>
	<div class="flex items-center justify-between gap-4">
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink :class="navigationMenuTriggerStyle()" class="flex items-center gap-1">
						<Label>
							Tura: <span class="text-primary"> {{ turn.value }} </span>
						</Label>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink :class="navigationMenuTriggerStyle()" class="flex items-center gap-1">
						<Icon icon="line-md:home" class="h-4 w-4 text-primary" />

						<RouterLink to="/">Strona główna</RouterLink>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button
								variant="ghost"
								class="flex items-center gap-1"
								@click="
									() => {
										if (!currentUser)
											toast({
												title: 'Musisz się zalogować!',
												description: 'Tylko zalogowani użytkownicy mogą wyświetlać swoje raporty.'
											});
									}
								"
							>
								<Icon icon="oui:app-reporting" class="h-4 w-4 text-primary" />

								Raporty
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end" class="gap-2 p-4" v-if="currentUser">
							<div>
								<Label>Twoje raporty</Label>

								<div></div>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink :class="navigationMenuTriggerStyle()" class="flex items-center gap-1">
						<Icon icon="majesticons:presentation-chart" class="h-4 w-4 text-primary" />

						<RouterLink to="/charts-and-stats/states/cells">Wykresy i statystyki</RouterLink>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink :class="navigationMenuTriggerStyle()" class="flex items-center gap-1">
						<Icon icon="game-icons:treasure-map" class="h-4 w-4 text-primary" />

						<RouterLink to="/map">Mapy</RouterLink>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>

		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem v-if="currentUser">
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button variant="ghost" class="flex items-center gap-1">
								<Icon icon="line-md:account" class="h-4 w-4 text-primary" />

								<span>{{ currentUser.username }}</span>
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end">
							<DropdownMenuLabel class="flex font-normal">
								<div class="flex flex-col space-y-1">
									<p class="text-sm font-medium leading-none">{{ currentUser.username }}</p>

									<p class="text-xs leading-none text-muted-foreground">{{ currentUser.email }}</p>
								</div>
							</DropdownMenuLabel>

							<DropdownMenuSeparator v-if="['moderator', 'admin'].includes(currentUser.role)" />

							<DropdownMenuGroup v-if="['moderator', 'admin'].includes(currentUser.role)">
								<DropdownMenuItem v-if="currentUser.role === 'admin'">
									<NavigationMenuLink class="flex h-full w-full items-center gap-1">
										<Icon icon="logos:pocket-base" class="h-4 w-4" />

										<a :href="pb_url" target="_blank">PocketBase</a>
									</NavigationMenuLink>
								</DropdownMenuItem>

								<DropdownMenuItem>
									<NavigationMenuLink class="flex h-full w-full items-center gap-1">
										<Icon icon="eos-icons:admin-outlined" class="h-4 w-4 text-primary" />

										<RouterLink to="/admin-panel">Admin Panel</RouterLink>
									</NavigationMenuLink>
								</DropdownMenuItem>
							</DropdownMenuGroup>

							<DropdownMenuSeparator />

							<DropdownMenuItem>
								<NavigationMenuLink class="flex h-full w-full items-center gap-1">
									<Icon icon="streamline:user-profile-focus" class="h-4 w-4 text-primary" />

									<RouterLink to="/profile">Profil</RouterLink>
								</NavigationMenuLink>
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							<DropdownMenuItem>
								<NavigationMenuLink
									@select="
										() => {
											pb.authStore.clear();
											currentUser = null;
										}
									"
									class="flex h-full w-full items-center gap-1"
								>
									<Icon icon="material-symbols:logout" class="h-4 w-4 text-primary" />

									<RouterLink to="/">Wyloguj się</RouterLink>
								</NavigationMenuLink>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</NavigationMenuItem>

				<NavigationMenuItem v-else>
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button variant="ghost" class="flex items-center gap-1">
								<Icon icon="line-md:account" class="h-4 w-4 text-primary" />

								<span>Konto</span>
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<NavigationMenuLink class="flex h-full w-full items-center gap-1">
									<Icon icon="material-symbols:login" class="h-4 w-4 text-primary" />

									<RouterLink to="/login">Zaloguj się</RouterLink>
								</NavigationMenuLink>
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							<DropdownMenuItem>
								<NavigationMenuLink class="flex h-full w-full items-center gap-1">
									<Icon icon="tdesign:user-arrow-up" class="h-4 w-4 text-primary" />

									<RouterLink to="/register">Zarejestruj się</RouterLink>
								</NavigationMenuLink>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button variant="ghost">
								<Icon icon="lucide:paintbrush" class="h-4 w-4 text-primary" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end">
							<ThemePicker />
						</DropdownMenuContent>
					</DropdownMenu>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	</div>
	<Separator class="bg-primary" />
</template>
