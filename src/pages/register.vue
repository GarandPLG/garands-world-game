<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { FormField } from '@/components/ui/form'

const pb = usePocketBase()
const router = useRouter()
const { toast } = useToast()
const { currentUser } = listenCurrentUser()

onMounted(() => {
  if (currentUser) router.push('/')
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      username: z.string().min(2).max(50),
      email: z.string().email(),
      password: z.string().min(10).max(72),
      passwordConfirm: z.string().min(10).max(72)
    })
  )
})

const onSubmit = handleSubmit(async (values) => {
  if (values.password !== values.passwordConfirm) {
    toast({
      title: 'Hasła nie są identyczne!',
      description: 'Wprowadź to samo hasło w obu polach.'
    })

    return
  }

  try {
    const createUser = await pb.collection('users').create({
      username: values.username,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm
    })

    if (createUser) {
      await pb.collection('users').requestVerification(values.email)

      toast({
        title: 'Konto zostało utworzone!',
        description:
          'Aktywuj swoje konto klikając w link, który został wysłany na podany adres email.'
      })

      router.push('/login')
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      toast({
        title: 'Błąd przy tworzeniu konta!',
        description: `${error.name}: ${error.message}`
      })
    else
      toast({
        title: 'Błąd przy tworzeniu konta!',
        description: 'Nieznany błąd.'
      })
  }
})
</script>

<template>
  <div class="flex items-center justify-center h-screen">
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
