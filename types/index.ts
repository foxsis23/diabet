export interface Answer {
  text: string
  points: number
}

export interface Question {
  id: number
  text: string
  hint?: string
  answers: Answer[]
}

export type PainLevel = 'mild' | 'moderate' | 'severe'

export interface PainResult {
  level: PainLevel
  title: string
  text: string
  steps: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
}
