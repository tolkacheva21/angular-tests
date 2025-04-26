// test.service.ts
import { Injectable } from '@angular/core';
import { Test, Question } from '../models/test.model';

@Injectable({
  providedIn: 'root'
})

export class TestService {
  private tests: Test[] = [];

  createTest(test: Test): void {
    this.tests.push(test);
    this.saveTestsToLocalStorage();
  }

  getTests(): Test[] {
    const testsJson = localStorage.getItem('tests');
    this.tests = testsJson ? JSON.parse(testsJson) : [];
    return this.tests;
  }

  getTestById(id: string): Test | undefined {
    return this.getTests().find(t => t.id === id);
  }

  private saveTestsToLocalStorage(): void {
    localStorage.setItem('tests', JSON.stringify(this.tests));
  }
}
