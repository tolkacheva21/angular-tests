// student-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestStartComponent } from './test-start/test-start.component';
import { TestComponent } from './test/test.component';
import { TestResultComponent } from './test-result/test-result.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: 'start/:id', component: TestStartComponent },
  { path: 'test/:id', component: TestComponent },
  { path: 'result/:id', component: TestResultComponent },
  { path: 'history', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentRoutingModule { }
