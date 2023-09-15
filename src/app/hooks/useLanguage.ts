import { useContext } from 'react'

import { LanguageContext, LanguageContextType } from '../components/LanguageContext'

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default useLanguage
