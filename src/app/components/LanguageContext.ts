import { createContext } from 'react'

export type Language = 'jp' | 'en'
export type LanguageContextType = {
  language: Language
  setLanguage: React.Dispatch<React.SetStateAction<Language>>
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)
