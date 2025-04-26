// test-result.model.ts
export interface TestResult {
    id: string;
    testId: string;
    studentName: string;
    score: number;
    totalPoints: number;
    date: Date;
    answers: { questionId: number, answer: number }[];
}
