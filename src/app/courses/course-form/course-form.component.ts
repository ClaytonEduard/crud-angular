import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form= this.formBuilder.group({
    name: [''],
    category: [''],
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    //this.form
  }

  ngOnInit(): void { }

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSuccess(),
      error => this.onError());
  }

  onCancel() {
    this.location.back();//volta a pagina anterior
  }

  // mensagem de sucesso
  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();// voltar a pagina
  }

  // mensagem de erro
  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }

}
