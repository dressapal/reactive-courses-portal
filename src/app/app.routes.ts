import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cursos',
        loadComponent: () => import('./course-list/course-list').then(m =>m.CourseList)
    }
    

];
