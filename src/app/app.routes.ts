import { Routes } from '@angular/router';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { TestResultComponent } from './components/test-result/test-result.component';
import { TakeTestComponent } from './components/take-test/take-test.component';
import { ListTestsComponent } from './components/list-tests/list-tests.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TeacherGuard } from './guards/teacher.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  { 
    path: 'teacher',
    canActivate: [AuthGuard, TeacherGuard],
    children: [
      { path: 'tests', component: ListTestsComponent },
      { path: 'tests/new', component: CreateTestComponent },
      { path: 'tests/:id/edit', component: CreateTestComponent },
      { path: 'results', component: TestResultComponent },
      { path: '', redirectTo: 'tests', pathMatch: 'full' }
    ]
  },
  
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
  
  { path: '**', redirectTo: 'tests' }
];
