// test.model.ts
export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
    points: number;
}
  
export interface Test {
    id: string;
    title: string;
    description: string;
    questions: Question[];
    duration?: number; // в минутах (опционально)
}
