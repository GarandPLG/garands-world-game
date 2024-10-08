<script setup lang="ts">
import { navigationMenuTriggerStyle } from './ui/navigation-menu'
import { Icon } from '@iconify/vue'

const pb = usePocketBase()

onMounted(() => {
  const { initCurrentUser, listenCurrentUserChange } = listenCurrentUser()
  initCurrentUser()
  listenCurrentUserChange()
})

const { currentUser } = storeToRefs(listenCurrentUser())
const mode = useColorMode()

console.table(currentUser.value)
</script>

<template>
  <div class="flex items-center justify-between gap-4">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            :class="navigationMenuTriggerStyle()"
            class="flex items-center gap-1"
          >
            <Icon icon="line-md:home" class="h-4 w-4" />

            <span>Strona główna</span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/sandbox"
            :class="navigationMenuTriggerStyle()"
            class="flex items-center gap-1"
          >
            <Icon icon="file-icons:sandbox" class="h-4 w-4" />

            <span>Sandbox</span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/raport"
            :class="navigationMenuTriggerStyle()"
            class="flex items-center gap-1"
          >
            <Icon icon="oui:app-reporting" class="h-4 w-4" />

            <span>Raport</span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/charts-and-stats"
            :class="navigationMenuTriggerStyle()"
            class="flex items-center gap-1"
          >
            <Icon icon="majesticons:presentation-chart" class="h-4 w-4" />

            <span>Wykresy i statystyki</span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/map"
            :class="navigationMenuTriggerStyle()"
            class="flex items-center gap-1"
          >
            <Icon icon="game-icons:treasure-map" class="h-4 w-4" />

            <span>Mapy</span>
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
                <Icon icon="line-md:account" class="h-4 w-4" />

                <span>{{ currentUser.username }}</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel class="font-normal flex">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium leading-none">{{ currentUser.username }}</p>

                  <p class="text-xs leading-none text-muted-foreground">{{ currentUser.email }}</p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator v-if="['moderator', 'admin'].includes(currentUser.role)" />

              <DropdownMenuGroup v-if="['moderator', 'admin'].includes(currentUser.role)">
                <DropdownMenuItem v-if="currentUser.role === 'admin'">
                  <NavigationMenuLink href="/pb/_/" class="w-full h-full flex items-center gap-1">
                    <Icon icon="logos:pocket-base" class="h-4 w-4" />

                    <span>PocketBase</span>
                  </NavigationMenuLink>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <NavigationMenuLink
                    href="/admin-panel"
                    class="w-full h-full flex items-center gap-1"
                  >
                    <Icon icon="eos-icons:admin-outlined" class="h-4 w-4" />

                    <span>Admin Panel</span>
                  </NavigationMenuLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <NavigationMenuLink href="/profile" class="w-full h-full flex items-center gap-1">
                  <Icon icon="streamline:user-profile-focus" class="h-4 w-4" />

                  <span>Profil</span>
                </NavigationMenuLink>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <NavigationMenuLink
                  href="/"
                  @select="pb.authStore.clear()"
                  class="w-full h-full flex items-center gap-1"
                >
                  <Icon icon="material-symbols:logout" class="h-4 w-4" />

                  <span>Wyloguj się</span>
                </NavigationMenuLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>

        <NavigationMenuItem v-else>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" class="flex items-center gap-1">
                <Icon icon="line-md:account" class="h-4 w-4" />

                <span>Konto</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <NavigationMenuLink href="/login" class="w-full h-full">
                  Zaloguj się
                </NavigationMenuLink>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <NavigationMenuLink href="/register" class="w-full h-full">
                  Zarejestruj się
                </NavigationMenuLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline">
                <Icon
                  icon="radix-icons:moon"
                  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />

                <Icon
                  icon="radix-icons:sun"
                  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="mode = 'light'"> Light </DropdownMenuItem>

              <DropdownMenuItem @click="mode = 'dark'"> Dark </DropdownMenuItem>

              <DropdownMenuItem @click="mode = 'auto'"> System </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
  <Separator label="Garand's WG" />
</template>
