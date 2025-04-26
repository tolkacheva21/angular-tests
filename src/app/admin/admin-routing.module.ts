// admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestListComponent } from './test-list/test-list.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { TestResultsComponent } from './test-results/test-results.component';

const routes: Routes = [
  { path: '', component: TestListComponent },
  { path: 'create', component: CreateTestComponent },
  { path: 'results/:id', component: TestResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
