import { createVuetify } from 'vuetify'
import { en, ru } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

import { DEFAULT_LOCALE } from '@shared/i18n/locales'

let vuetifyInstance = null

export function setVuetifyLocale (locale) {
  if (vuetifyInstance) {
    vuetifyInstance.locale.current.value = locale || DEFAULT_LOCALE
  }
}

const vuetify = createVuetify({
  locale: {
    locale: DEFAULT_LOCALE,
    messages: { en, ru }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#ffffff',
          secondary: '#b32121'
        }
      }
    }
  }
})

vuetifyInstance = vuetify

export default vuetify
