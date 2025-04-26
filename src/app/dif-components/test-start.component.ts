import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-start',
  templateUrl: './test-start.component.html',
  styleUrls: ['./test-start.component.css']
})

export class TestStartComponent {
  studentName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  startTest(): void {
    if (this.studentName.trim()) {
      localStorage.setItem('currentStudent', this.studentName);
      const testId = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['/student/test', testId]);
    }
  }
}
