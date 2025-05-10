export interface TestResult {
    id: string;
    studentName: string;
    testTitle: string;
    testId: string;
    score: number;
    maxScore: number;
    completedAt: Date;
    answers: {
      question: string;
      selectedAnswer: string;
      isCorrect: boolean;
    }[];
}
