import { Injectable } from '@angular/core';
import { Test} from '../models/test.model';
import { TestResult } from '../models/test-result.model';

@Injectable({ providedIn: 'root' })
export class TestService {
  private tests: Test[] = [];
  private results: TestResult[] = [];

  constructor() {
    const savedTests = localStorage.getItem('tests');
    if (savedTests) this.tests = JSON.parse(savedTests);
  
    const savedResults = localStorage.getItem('results');
    if (savedResults) this.results = JSON.parse(savedResults);
  }

  saveTest(test: Test): void {
    this.tests.push(test);
    console.log('Test saved:', test);
    localStorage.setItem('tests', JSON.stringify(this.tests));
  }

  getTests(): Test[] {
    return [...this.tests];
  }

  saveResult(result: Omit<TestResult, 'id'>): void {
    const newResult: TestResult = {
      ...result,
      id: Date.now().toString()
    };
    this.results.push(newResult);
    localStorage.setItem('results', JSON.stringify(this.results));
  }

  getResults(): TestResult[] {
    return [...this.results];
  }

  getResultsByTestId(testId: string): TestResult[] {
    return this.results.filter(r => r.testId === testId);
  }
}
