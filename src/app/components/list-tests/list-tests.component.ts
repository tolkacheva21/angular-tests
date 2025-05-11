import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Test } from '../../models/test.model';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-list-tests',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-tests.component.html',
  styleUrl: './list-tests.component.css'
})

export class ListTestsComponent implements OnInit {
  tests: Test[] = [];
  isLoading = true;

  constructor(
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(): void {
    this.isLoading = true;
    this.tests = this.testService.getTests();
    this.isLoading = false;
  }

  editTest(testId: string): void {
    this.router.navigate(['/tests', testId, 'edit']);
  }

  deleteTest(testId: string): void {
    if (confirm('Вы уверены, что хотите удалить этот тест?')) {
      this.testService.deleteTest(testId);
      this.loadTests();
    }
  }

  viewResults(testId: string): void {
    this.router.navigate(['/tests', testId, 'results']);
  }

  takeTest(testId: string): void {
    this.router.navigate(['/tests', testId, 'take']);
  }

  getQuestionCount(test: Test): number {
    return test.questions.length;
  }

  getTotalPoints(test: Test): number {
    return test.questions.reduce((sum, question) => sum + question.points, 0);
  }
}
