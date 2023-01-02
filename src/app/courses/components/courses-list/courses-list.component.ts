import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  // todos os eventos que esta vindo para esta classe
  @Input() courses: Course[] = [];

  // todos os eventos que estao saindo desta
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() {}
  ngOnInit(): void { }
  onAdd() {
    this.add.emit(true);
  }
  onEdit(course:Course){
    this.edit.emit(course);
  }
}

