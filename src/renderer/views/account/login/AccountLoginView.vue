<template>
  <div class="d-flex fill-height align-center justify-center" @keyup.enter="authorize">
    <v-row justify="center" align="center">

      <v-col cols="12" sm="3" align-self="center">
        <v-img :transition="false" class="image" contain :src="image"/>
      </v-col>

      <v-col cols="12" sm="6" align-self="center">
        <v-card flat color="transparent">
          <v-card-title>{{ $t('login.title') }}</v-card-title>
          <v-card-text>
            <div>{{ $t('login.subtitle') }}</div>
          </v-card-text>
          <!-- Login / Email -->
          <!-- Password -->
          <div class="d-flex py-6 pt-2 ga-2">
            <v-text-field
              v-model="login"
              variant="outlined"
              density="comfortable"
              hide-details
              :placeholder="$t('login.emailPlaceholder')"
              prepend-inner-icon="mdi-account"/>
            <v-text-field
              v-model="password"
              variant="outlined"
              density="comfortable"
              hide-details
              type="password"
              :placeholder="$t('login.passwordPlaceholder')"
              prepend-inner-icon="mdi-lock"/>
          </div>

          <!-- Actions -->
          <div class="d-flex">
            <v-btn v-bind="{loading}" class="mr-1" :disabled="v$.$invalid" @click="authorize">{{ $t('login.title') }}</v-btn>
            <v-btn v-bind="{loading}" variant="text" @click="toBack">{{ $t('common.back') }}</v-btn>
          </div>

          <v-divider class="my-6" />

          <div class="d-flex justify-center">
            <v-btn color="#1976d2" variant="flat" @click="authorizeWithVK">{{ $t('login.vkLogin') }}</v-btn>
          </div>

        </v-card>
      </v-col>

    </v-row>
  </div>
</template>

<script>

// Images
import LibriaTyan03 from '@assets/images/libria-tyan/LibriaTyan03.svg'
import { ipcRenderer } from "electron";
// Utils
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { BackViewMixin } from '@mixins/views'
import { invokeSafeStorageEncrypt } from '@main/handlers/app/app-handlers'
import { useAccountStore } from '@store/app/account/useAccountStore'
import { useFavoritesStore } from '@store/favorites/useFavoritesStore'

export default {
  name: 'Account.Login.View',
  mixins: [BackViewMixin],
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      tab: 0,
      from: null,
      login: null,
      image: LibriaTyan03,
      loading: false,
      password: null,
    }
  },

  validations () {
    return {
      login: { required },
      password: { required },
    }
  },
  mounted () {
    // Already authorized — go back instead of showing login page
    if (useAccountStore().isAuthorized) {
      this.toBack()
      return
    }

    ipcRenderer.on('VK_CODE', async (event, session) => {
      try {
        this.loading = true
        await useAccountStore().setSession(session)

        // Get profile data
        await useAccountStore().getProfile()
        await this.toBack()

        // Get user favorites
        useFavoritesStore().getFavorites()
        this.loading = false
      } catch (e) {
        console.error(e)

        if (e.response.status === 401) {
          this.$toast.error(this.$t('login.userNotRegistered'))
        }
        this.loading = false
      }
    })
  },
  beforeUnmount() {
    ipcRenderer.removeAllListeners('VK_CODE')
  },
  methods: {

    authorizeWithVK () {
      window.open(
        'https://oauth.vk.com/authorize?client_id=5315207&redirect_uri=https://www.anilibria.tv/public/vk.php'
        ,'targetWindow',
        `toolbar=no,
                location=no,
                status=no,
                menubar=no,
                scrollbars=yes,
                resizable=yes,
                width=SomeSize,
                height=SomeSize`
      )
    },
    /**
     * Authorize
     *
     * @return {Promise<void>}
     */
    async authorize () {
      if (!this.v$.$invalid) {
        try {
          this.loading = true

          const payload = { login: this.login, password: this.password }
          const isAlreadyAuthorizedError = (e) => {
            const msg = String(e?.response?.data?.mes || e?.response?.data?.err || e?.message || '')
            return /already\s*authoriz|уже\s*авториз/i.test(msg)
          }

          // Helper: complete the login flow with a session id
          const finishLogin = async (session) => {
            await Promise.allSettled([
              invokeSafeStorageEncrypt('user.login', this.login),
              invokeSafeStorageEncrypt('user.password', this.password)
            ])
            await useAccountStore().setSession(session)
            await useAccountStore().getProfile()
            useFavoritesStore().getFavorites()
            await this.toBack()
          }

          let session = null
          try {
            session = await useAccountStore().login(payload)
          } catch (e) {
            if (isAlreadyAuthorizedError(e)) {
              // Server has stale session — kill it and retry
              try { await useAccountStore().logout() } catch (_) {}
              try {
                session = await useAccountStore().login(payload)
              } catch (e2) {
                this.$toast.error(e2?.message || 'Ошибка авторизации')
                return
              }
            } else {
              this.$toast.error(e?.message || 'Ошибка авторизации')
              return
            }
          }

          if (!session) return
          await finishLogin(session)

        } finally {
          this.loading = false
        }
      }
    }
  }

}
</script>
