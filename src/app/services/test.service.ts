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

  getTestById(id: string): Test | undefined {
    const tests = this.getTests();
    return tests.find(test => test.id === id);
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

  private saveTests(tests: Test[]): void {
    localStorage.setItem('tests', JSON.stringify(tests));
  }

  updateTest(updatedTest: Test): void {
    const tests = this.getTests();
    const index = tests.findIndex(test => test.id === updatedTest.id);
    if (index !== -1) {
      tests[index] = updatedTest;
      this.saveTests(tests);
    }
  }

  deleteTest(testId: string): void {
    this.tests = this.tests.filter(test => test.id !== testId);
    localStorage.setItem('tests', JSON.stringify(this.tests));
    
    // Также удаляем связанные результаты
    this.results = this.results.filter(result => result.testId !== testId);
    localStorage.setItem('results', JSON.stringify(this.results));
  }
}
