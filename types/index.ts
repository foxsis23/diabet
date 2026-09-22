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

export type BpLevel =
  | 'unknown'
  | 'optimal'
  | 'normal'
  | 'high_normal'
  | 'grade1'
  | 'grade2'
  | 'grade3'

export interface BpResult {
  level: BpLevel
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
