import { Injectable } from '@angular/core';
import { Test} from '../models/test.model';
import { TestResult } from '../models/test-result.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TestService {
  private tests: Test[] = [];
  private results: TestResult[] = [];
  private testsSubject = new BehaviorSubject<Test[]>([]);
  
  tests$ = this.testsSubject.asObservable();

  constructor() {
    const savedTests = localStorage.getItem('tests');
    if (savedTests) this.tests = JSON.parse(savedTests);
  
    const savedResults = localStorage.getItem('results');
    if (savedResults) this.results = JSON.parse(savedResults);

    this.testsSubject.next(this.tests);
  }

  private updateStorageAndNotify(): void {
    localStorage.setItem('tests', JSON.stringify(this.tests));
    this.testsSubject.next([...this.tests]);
  }

  saveTest(test: Test): void {
    this.tests.push(test);
    this.updateStorageAndNotify();
  }

  getTests(): Test[] {
    return [...this.tests];
  }

  getTestById(id: string): Test | undefined {
    return this.tests.find(test => test.id === id);
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

  updateTest(updatedTest: Test): void {
    const index = this.tests.findIndex(test => test.id === updatedTest.id);
    if (index !== -1) {
      this.tests[index] = updatedTest;
      this.updateStorageAndNotify();
    }
  }

  deleteTest(testId: string): void {
    this.tests = this.tests.filter(test => test.id !== testId);
  
    // Также удаляем связанные результаты
    this.results = this.results.filter(result => result.testId !== testId);
    localStorage.setItem('results', JSON.stringify(this.results));

    this.updateStorageAndNotify();
  }
}
