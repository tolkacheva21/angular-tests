import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test.model';
import { TestResult } from '../../models/test-result.model';

@Component({
  selector: 'app-take-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})

export class TakeTestComponent implements OnInit {
  test!: Test;
  studentName: string = '';
  userAnswers: {[questionIndex: number]: number} = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('id');
    const test = this.testService.getTests().find(t => t.id === testId);
    
    if (!test) {
      this.router.navigate(['/tests']);
      return;
    }
    
    this.test = test;
  }

  submitTest(): void {
    if (!this.studentName) {
      alert('Введите ваше имя');
      return;
    }

    let score = 0;
    const answers = [];

    for (let i = 0; i < this.test.questions.length; i++) {
      const question = this.test.questions[i];
      const selectedAnswerIndex = this.userAnswers[i];
      const isCorrect = selectedAnswerIndex === question.correctAnswer;
      
      if (isCorrect) {
        score += question.points;
      }

      answers.push({
        question: question.text,
        selectedAnswer: question.options[selectedAnswerIndex]?.text || 'Нет ответа',
        isCorrect
      });
    }

    const result: Omit<TestResult, 'id'> = {
      testId: this.test.id,
      testTitle: this.test.title,
      studentName: this.studentName,
      score,
      maxScore: this.test.questions.reduce((sum, q) => sum + q.points, 0),
      completedAt: new Date(),
      answers
    };

    this.testService.saveResult(result);
    this.router.navigate(['tests/results']);
  }
}
