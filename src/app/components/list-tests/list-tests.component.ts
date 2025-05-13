import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Test } from '../../models/test.model';
import { TestService } from '../../services/test.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isTeacher: boolean = false;

  constructor(
    private testService: TestService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.isTeacher = this.authService.isTeacher();
  }

  ngOnInit(): void {
    this.loadTests();

    // Подписываемся на изменения
    this.testService.tests$.subscribe(tests => {
      this.tests = tests;
      this.isLoading = false;
    });
  }

  loadTests(): void {
    this.isLoading = true;
  }

  editTest(testId: string): void {
    this.router.navigate(['/tests', testId, 'edit']);
  }

  async deleteTest(testId: string): Promise<void> {
    const confirmed = await this.showConfirmDialog(
      'Подтверждение',
      'Вы уверены, что хотите удалить этот тест?'
    );

    if (confirmed) {
      this.testService.deleteTest(testId);
      this.loadTests();
    }
  }

  viewAllResults(): void {
    this.router.navigate(['/results']);
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

  private showConfirmDialog(title: string, message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const snackBarRef = this.snackBar.open(message, 'Подтвердить', {duration: 5000});

      snackBarRef.onAction().subscribe(() => {
        resolve(true);
      });

      snackBarRef.afterDismissed().subscribe(() => {
        resolve(false);
      });
    });
  }
}
