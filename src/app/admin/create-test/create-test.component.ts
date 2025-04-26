// create-test.component.ts
import { Component } from '@angular/core';
import { Test, Question } from '../../shared/models/test.model';
import { TestService } from '../../shared/services/test.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})

export class CreateTestComponent {
  test: Test = {
    id: uuidv4(),
    title: '',
    description: '',
    questions: [],
    duration: undefined
  };

  currentQuestion: Question = {
    id: 0,
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1
  };

  constructor(private testService: TestService) {}

  addQuestion(): void {
    this.currentQuestion.id = this.test.questions.length;
    this.test.questions.push({...this.currentQuestion});
    this.resetCurrentQuestion();
  }

  saveTest(): void {
    this.testService.createTest(this.test);
    // Здесь можно добавить навигацию или сообщение об успехе
  }

  private resetCurrentQuestion(): void {
    this.currentQuestion = {
      id: 0,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1
    };
  }
}
