import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100)]],
    category: ['', [Validators.required]],
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    //this.form
  }

  ngOnInit(): void {
    // pegando os dados para edicao
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSuccess(),
      error => this.onError());
  }

  onCancel() {
    this.location.back();//volta a pagina anterior
  }

  // mensagem de sucesso
  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();// voltar a pagina
  }

  // mensagem de erro
  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }

  getErrorMenssage(fieldName: string) {
    const field = this.form.get(fieldName);
    // validação mensagem Front-End
    if (field?.hasError('required')) {
      return 'Campo Obrigatório';
    }
    // validação mensagem Front-End
    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho maxímo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo Inválido';
  }
}
