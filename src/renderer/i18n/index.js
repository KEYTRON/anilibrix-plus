import { reactive } from 'vue'

import en from '@shared/i18n/messages/en'
import ru from '@shared/i18n/messages/ru'
import { DEFAULT_LOCALE } from '@shared/i18n/locales'

const messages = { en, ru }
const state = reactive({
  locale: DEFAULT_LOCALE
})

function getValue (source, path) {
  return path.split('.').reduce((value, key) => (value && value[key] !== undefined ? value[key] : undefined), source)
}

function interpolate (value, params = {}) {
  if (typeof value !== 'string') {
    return value
  }

  return value.replace(/\{(\w+)\}/g, (match, key) => (params[key] !== undefined ? params[key] : match))
}

export function translate (key, params = {}, locale = state.locale) {
  const localized = getValue(messages[locale] || messages[DEFAULT_LOCALE], key)
  const fallback = localized !== undefined ? localized : getValue(messages[DEFAULT_LOCALE], key)

  if (fallback === undefined) {
    return key
  }

  return interpolate(fallback, params)
}

export function setLocale (locale) {
  state.locale = locale || DEFAULT_LOCALE
}

export function getLocale () {
  return state.locale
}

export function installI18n (app) {
  app.config.globalProperties.$t = (key, params = {}) => translate(key, params, state.locale)
  app.config.globalProperties.$setLocale = setLocale
  Object.defineProperty(app.config.globalProperties, '$locale', {
    get () { return state.locale }
  })
}

export const i18nState = state
