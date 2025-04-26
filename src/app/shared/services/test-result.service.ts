// test-result.service.ts
import { Injectable } from '@angular/core';
import { TestResult } from '../models/test-result.model';

@Injectable({
  providedIn: 'root'
})

export class TestResultService {
  private results: TestResult[] = [];

  saveResult(result: TestResult): void {
    this.results.push(result);
    localStorage.setItem('testResults', JSON.stringify(this.results));
  }

  getResultsByTest(testId: string): TestResult[] {
    const resultsJson = localStorage.getItem('testResults');
    this.results = resultsJson ? JSON.parse(resultsJson) : [];
    return this.results.filter(r => r.testId === testId);
  }

  getStudentResults(studentName: string): TestResult[] {
    const resultsJson = localStorage.getItem('testResults');
    this.results = resultsJson ? JSON.parse(resultsJson) : [];
    return this.results.filter(r => r.studentName === studentName);
  }
}
