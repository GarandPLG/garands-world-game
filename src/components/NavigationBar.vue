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

watch(currentUser, (user) => {
  console.log('watch currentUser', user)
})

const mode = useColorMode()
</script>

<template>
  <div class="flex items-center justify-between gap-4">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
            Strona główna
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/sandbox" :class="navigationMenuTriggerStyle()">
            Sandbox
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/raport" :class="navigationMenuTriggerStyle()">
            Raport
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/charts-and-stats" :class="navigationMenuTriggerStyle()">
            Wykresy i statystyki
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/map" :class="navigationMenuTriggerStyle()">
            Mapy
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <NavigationMenu>
      <NavigationMenuList>
        <!-- <NavigationMenuItem>
          <NavigationMenuLink
            v-if="currentUser"
            href="/"
            :class="navigationMenuTriggerStyle()"
            @select="pb.authStore.clear()"
          >
            {{ currentUser.username }}
          </NavigationMenuLink>
          <NavigationMenuLink v-else href="/login" :class="navigationMenuTriggerStyle()">
            Zaloguj się
          </NavigationMenuLink>
        </NavigationMenuItem> -->

        <NavigationMenuItem v-if="currentUser">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost"> Konto </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel class="font-normal flex">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium leading-none">{{ currentUser.username }}</p>

                  <p class="text-xs leading-none text-muted-foreground">{{ currentUser.email }}</p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <NavigationMenuLink href="/profile" class="w-full h-full">
                    Profil
                  </NavigationMenuLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <NavigationMenuLink href="/" @select="pb.authStore.clear()" class="w-full h-full">
                  Wyloguj się
                </NavigationMenuLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>

        <NavigationMenuItem v-else>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost"> Użytkownik </Button>
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
