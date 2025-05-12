import { Component } from '@angular/core';
import { Test } from '../../models/test.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '../../services/test.service';


@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.css'
})

export class CreateTestComponent {
  test: Test = {
    id: Date.now().toString(),
    title: '',
    description: '',
    questions: []
  };
  isEditMode = false;

  constructor(
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('id');
    if (testId) {
      this.isEditMode = true;
      const existingTest = this.testService.getTestById(testId);
      if (existingTest) {
        this.test = JSON.parse(JSON.stringify(existingTest)); // Deep copy
      } else {
        alert('Тест не найден');
        this.router.navigate(['/tests']);
      }
    } else {
      this.addQuestion(); // Добавляем первый вопрос только при создании нового теста
    }
  }

  addQuestion(): void {
    this.test.questions.push({
      text: '',
      points: 1,
      options: [
        { text: '' },
        { text: '' }
      ],
      correctAnswer: null
    });
  }

  removeQuestion(index: number): void {
    this.test.questions.splice(index, 1);
  }

  addOption(questionIndex: number): void {
    this.test.questions[questionIndex].options.push({ text: '' });
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const question = this.test.questions[questionIndex];
    question.options.splice(optionIndex, 1);
    
    // Обновляем индекс правильного ответа при необходимости
    if (question.correctAnswer === optionIndex) {
      question.correctAnswer = null;
    } else if (question.correctAnswer !== null && question.correctAnswer > optionIndex) {
      question.correctAnswer--;
    }
  }

  saveTest(): void {
    if (!this.validateTest()) return;

    if (this.isEditMode) {
      this.testService.updateTest(this.test);
      alert('Тест успешно обновлен!');
    } else {
      this.testService.saveTest(this.test);
      alert('Тест успешно сохранен!');
    }

    this.router.navigate(['/tests']);
  }

  private validateTest(): boolean {
    if (!this.test.title) {
      alert('Введите название теста');
      return false;
    }

    if (this.test.questions.length === 0) {
      alert('Добавьте хотя бы один вопрос');
      return false;
    }

    for (let i = 0; i < this.test.questions.length; i++) {
      const question = this.test.questions[i];
      
      if (!question.text) {
        alert(`Вопрос #${i + 1}: введите текст вопроса`);
        return false;
      }

      if (question.options.length < 2) {
        alert(`Вопрос #${i + 1}: должно быть минимум 2 варианта ответа`);
        return false;
      }

      if (question.correctAnswer === null) {
        alert(`Вопрос #${i + 1}: выберите правильный ответ`);
        return false;
      }

      for (let j = 0; j < question.options.length; j++) {
        if (!question.options[j].text) {
          alert(`Вопрос #${i + 1}: вариант ответа #${j + 1} не может быть пустым`);
          return false;
        }
      }
    }

    return true;
  }

  loadTest(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const loadedTest = JSON.parse(reader.result as string) as Test;
        this.test = loadedTest;
      } catch (error) {
        alert('Ошибка при загрузке файла: ' + (error as Error).message);
      }
    };

    reader.readAsText(file);
  }

  clearTest(): void {
    if (confirm('Вы уверены, что хотите очистить форму?')) {
      this.test = {
        id: '',
        title: '',
        description: '',
        questions: []
      };
      this.addQuestion();
    }
  }

  private downloadFile(data: string, filename: string): void {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
