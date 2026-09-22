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

export type RiskLevel = 'low' | 'slight' | 'moderate' | 'high' | 'very_high'

export interface RiskResult {
  level: RiskLevel
  title: string
  /** Імовірність діабету 2 типу за 10 років за шкалою FINDRISC. */
  odds: string
  text: string
  steps: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
}
