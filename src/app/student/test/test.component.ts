// test.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test, Question } from '../../shared/models/test.model';
import { TestService } from '../../shared/services/test.service';
import { TestResultService } from '../../shared/services/test-result.service';
import { TestResult } from '../../shared/models/test-result.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit, OnDestroy {
  test: Test | undefined;
  currentQuestionIndex = 0;
  studentName = '';
  answers: { questionId: number, answer: number }[] = [];
  timer: number | undefined;
  timeLeft: number = 0;
  timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private resultService: TestResultService
  ) {}

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('id');
    this.studentName = localStorage.getItem('currentStudent') || '';
    
    if (testId) {
      this.test = this.testService.getTestById(testId);
      if (this.test?.duration) {
        this.timeLeft = this.test.duration * 60;
        this.startTimer();
      }
    }
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.finishTest();
      }
    }, 1000);
  }

  selectAnswer(optionIndex: number): void {
    if (this.test) {
      const questionId = this.test.questions[this.currentQuestionIndex].id;
      const existingAnswerIndex = this.answers.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex >= 0) {
        this.answers[existingAnswerIndex].answer = optionIndex;
      } else {
        this.answers.push({ questionId, answer: optionIndex });
      }
    }
  }

  nextQuestion(): void {
    if (this.test && this.currentQuestionIndex < this.test.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  finishTest(): void {
    clearInterval(this.timerInterval);
    
    if (this.test) {
      let score = 0;
      const totalPoints = this.test.questions.reduce((sum, q) => sum + q.points, 0);
      
      this.test.questions.forEach(q => {
        const answer = this.answers.find(a => a.questionId === q.id);
        if (answer && answer.answer === q.correctAnswer) {
          score += q.points;
        }
      });
      
      const result: TestResult = {
        id: uuidv4(),
        testId: this.test.id,
        studentName: this.studentName,
        score,
        totalPoints,
        date: new Date(),
        answers: this.answers
      };
      
      this.resultService.saveResult(result);
      // Здесь должна быть навигация на страницу результата
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }
}
