import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

import { CoursesService } from '../../services/courses.service';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {


  form!: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
    //this.form
  }

  ngOnInit(): void {
    // pegando os dados para edicao
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retriveLessons(course), Validators.required)
    });
  }

  private retriveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }



  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(11)]]
    });
  }

  // metodo para listar as licoes da aula
  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }
  //metodo criar licoes
  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }
  // metodo remover licao
  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }


  onSubmit() {
    // verificação do formulario de aulas
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(result => this.onSuccess(),
        error => this.onError());
    } else {
      this.formUtils.validadeAllFormFields(this.form);
    }
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

}
