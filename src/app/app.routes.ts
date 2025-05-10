import { Routes } from '@angular/router';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { TestResultComponent } from './components/test-result/test-result.component';
import { TakeTestComponent } from './components/take-test/take-test.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tests', pathMatch: 'full' },
  { path: 'tests/new', component: CreateTestComponent},
  { path: 'tests/:id/edit', component: CreateTestComponent},
  { path: 'tests/results', component: TestResultComponent },
  { path: 'tests/:id/take', component: TakeTestComponent }
];
