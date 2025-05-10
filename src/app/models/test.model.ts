export interface TestOption {
    text: string;
}
  
export interface TestQuestion {
    text: string;
    points: number;
    options: TestOption[];
    correctAnswer: number | null;
}
  
export interface Test {
    id: string;
    title: string;
    description: string;
    questions: TestQuestion[];
}
