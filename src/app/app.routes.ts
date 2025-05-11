import { Routes } from '@angular/router';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { TestResultComponent } from './components/test-result/test-result.component';
import { TakeTestComponent } from './components/take-test/take-test.component';
import { ListTestsComponent } from './components/list-tests/list-tests.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  // Маршруты для преподавателя
  { 
    path: 'teacher',
    canActivate: [AuthGuard, TeacherGuard],
    children: [
      { path: 'dashboard', component: TeacherDashboardComponent },
      { path: 'tests', component: ListTestsComponent },
      { path: 'tests/new', component: CreateTestComponent },
      { path: 'tests/:id/edit', component: CreateTestComponent },
      { path: 'tests/:id/results', component: TestResultComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  // Маршруты для студента
  { 
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'tests', component: ListTestsComponent },
      { path: 'tests/:id/take', component: TakeTestComponent },
      { path: 'results', component: TestResultComponent },
      { path: '', redirectTo: 'tests', pathMatch: 'full' }
    ]
  },
  
  // Перенаправление по умолчанию
  { path: '**', redirectTo: 'tests' }
];
