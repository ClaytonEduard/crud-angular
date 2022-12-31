import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  // inserindo dados da api spring java
  // para acessar devemos criar um prox pois o CORS não deixa acessarmos o dominos
  private readonly API = 'api/courses'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(),
        //delay(5000),
        tap(courses => console.log(courses))
      );
  }

  // metodo enviar
  save(record: Partial<Course>) {
    // enviando dados como HttpClient pelo post
    // busca o http envia pelo post, passando um objeto do tipo curso com API back-end
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

}
