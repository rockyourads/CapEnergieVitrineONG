import { createI18n } from 'vue-i18n'
import fr from './fr'
import en from './en'

const savedLocale = typeof localStorage !== 'undefined' ? localStorage.getItem('locale') : null

const i18n = createI18n({
  legacy: false,
  locale: savedLocale || 'fr',
  fallbackLocale: 'fr',
  messages: { fr, en },
})

export default i18n
