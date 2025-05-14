import { Component, OnInit } from '@angular/core';
import { TestResult } from '../../models/test-result.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-result',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.css'
})

export class TestResultComponent implements OnInit {
  results: TestResult[] = [];
  filteredResults: TestResult[] = [];
  searchText: string = '';

  constructor(
    private testService: TestService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.results = this.testService.getResults();
    this.filteredResults = [...this.results];
  }

  applyFilter(): void {
    if (!this.searchText) {
      this.filteredResults = [...this.results];
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    this.filteredResults = this.results.filter(result => 
      result.studentName.toLowerCase().includes(searchLower) ||
      result.testTitle.toLowerCase().includes(searchLower)
    );
  }

  calculatePercentage(score: number, maxScore: number): number {
    return Math.round((score / maxScore) * 100);
  }

  viewDetails(result: TestResult): void {
    this.showSnackbar(`Детали теста для ${result.studentName}\nПравильных ответов: ${result.score} из ${result.maxScore}`);
  }

  goBack(): void {
    this.router.navigate(['/tests']);
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Закрыть', {duration: 3000});
  }
}
