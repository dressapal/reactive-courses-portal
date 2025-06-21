import { inject, Injectable } from '@angular/core';
import { Curso } from '../sharing/models/course';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Service {

  private baseURL = 'http://localhost:3000/api/cursos';

  constructor(private http:HttpClient){}


 getCursos(): Observable<Curso[]> {
  return this.http.get<Curso[]>(this.baseURL);

}

 updateCurso(id: number, curso: Partial<Curso>): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseURL}/${id}`, curso);
  }
}
