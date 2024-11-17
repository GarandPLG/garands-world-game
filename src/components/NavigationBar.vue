<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { navigationMenuTriggerStyle } from './ui/navigation-menu';

const pb = usePocketBase();

onMounted(() => {
	const { initCurrentUser, listenCurrentUserChange } = listenCurrentUser();
	initCurrentUser();
	listenCurrentUserChange();
});

const { currentUser } = storeToRefs(listenCurrentUser());

const pb_url = import.meta.env.PROD ? '/_/' : '/pb/_/';
</script>

<template>
	<div class="flex items-center justify-between gap-4">
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink :class="navigationMenuTriggerStyle()" class="flex items-center gap-1">
						<Icon icon="line-md:home" class="h-4 w-4 text-primary" />

						<RouterLink to="/">Strona główna</RouterLink>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink :class="navigationMenuTriggerStyle()" class="flex items-center gap-1">
						<Icon icon="file-icons:sandbox" class="h-4 w-4 text-primary" />

						<RouterLink to="/sandbox">Piaskownica</RouterLink>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink :class="navigationMenuTriggerStyle()" class="flex items-center gap-1">
						<Icon icon="oui:app-reporting" class="h-4 w-4 text-primary" />

						<RouterLink to="/report">Raport</RouterLink>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink :class="navigationMenuTriggerStyle()" class="flex items-center gap-1">
						<Icon icon="majesticons:presentation-chart" class="h-4 w-4 text-primary" />

						<RouterLink to="/charts-and-stats">Wykresy i statystyki</RouterLink>
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
									@select="pb.authStore.clear()"
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
							<Button variant="outline">
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
