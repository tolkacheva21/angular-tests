import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Панель преподавателя</h1>
    <nav>
      <a routerLink="/teacher/tests">Мои тесты</a>
      <a routerLink="/teacher/tests/new">Создать тест</a>
    </nav>
  `,
  styles: [`
    nav {
      display: flex;
      gap: 20px;
      margin: 20px 0;
    }
    a {
      padding: 10px 15px;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  `]
})

export class TeacherDashboardComponent {}
