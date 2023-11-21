import i18n from '@/lang'

export default function useTitle() {
  const $t = i18n.global.t
  function setTitle() {
    document.title = $t('fields.title')
  }
  return { setTitle }
}
