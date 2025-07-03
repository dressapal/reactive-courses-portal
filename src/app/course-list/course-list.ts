import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  effect,
  Signal,
  computed,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Service } from '../service/service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Curso } from '../sharing/models/course';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EditCursoDialog } from '../edit-curso-dialog';
import { filter, map, startWith, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DeleteCourse } from '../delete-course/delete-course';

@Component({
  selector: 'app-course-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseList {
  buscador = new FormControl('');
  cursosOriginales = signal<Curso[]>([]);
  readonly buscadorSignal = toSignal(
    this.buscador.valueChanges.pipe(startWith('')),
    { initialValue: '' }
  );

  dialog = inject(MatDialog);
  private cursoService = inject(Service);
  displayedColumns = [
    'nombre',
    'descripcion',
    'fechaInicio',
    'duracion',
    'activo',
    'acciones',
  ];
  private refrescar = signal(0);
  cursos = signal<Curso[]>([]);

  constructor(private snackBar: MatSnackBar) {
    effect(() => {
      this.refrescar(); // dependencia
      const filtro = (this.buscadorSignal() ?? '').toLowerCase();
      if (!filtro) {
        this.getCursos();
      } else {
        this.cursos.set(
          this.cursosOriginales().filter((curso) =>
            curso.nombre.toLowerCase().includes(filtro)
          )
        );
      }
    });
  }

  getCursos() {
    return this.cursoService.getCursos().subscribe((cursos) => {
      this.cursosOriginales.set(cursos);
      this.cursos.set(cursos);
    });
  }

  editarCurso(curso: Curso) {
    const dialogRef = this.dialog.open(EditCursoDialog, {
      data: curso,
      width: '600px', // ancho
      maxWidth: '90vw', // máximo ancho (opcional)
      height: 'auto', // alto (puede ser 'auto' o fijo como '400px')
      maxHeight: '80vh', // máximo alto (opcional)
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((actualizado: Curso) =>
          this.cursoService.updateCurso(actualizado._id, actualizado)
        ),
        tap(() => {
          this.refrescar.set(this.refrescar() + 1);
        })
      )
      .subscribe(() => {
        this.snackBar.open('🍕 Curso actualizado con éxito', 'Cerrar', {
          duration: 3000, // ms, se cierra solo
          horizontalPosition: 'right',
          verticalPosition: 'top',

          panelClass: 'custom-snackbar',
        });
      });
  }

  eliminarCurso(curso:Curso){
    console.log(curso);
    const dialogRefDelete = this.dialog.open(DeleteCourse, {
      data: curso,
      width: '600px', // ancho
      maxWidth: '90vw', // máximo ancho (opcional)
      height: 'auto', // alto (puede ser 'auto' o fijo como '400px')
      maxHeight: '80vh', // máximo alto (opcional)
    });


    dialogRefDelete.afterClosed().pipe(
        filter(Boolean),
        switchMap((eliminarCurso:Curso) =>
          this.cursoService.deleteCurso(eliminarCurso._id)
        ),
        tap(() => {
          this.refrescar.set(this.refrescar() + 1);
        })
    ) .subscribe(() => {
        this.snackBar.open('🍕 Curso eliminado con éxito', 'Cerrar', {
          duration: 3000, // ms, se cierra solo
          horizontalPosition: 'right',
          verticalPosition: 'top',

          panelClass: 'custom-snackbar',
        });
      });

  }

  addCourse(){
    console.log("add curso")
    const dialogRef = this.dialog.open(EditCursoDialog, {
      data: {},
      width: '600px', // ancho
      maxWidth: '90vw', // máximo ancho (opcional)
      height: 'auto', // alto (puede ser 'auto' o fijo como '400px')
      maxHeight: '80vh', // máximo alto (opcional)
    });

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      switchMap((addCurso:Curso) => this.cursoService.addCurso(addCurso)),
      tap(()=>  this.refrescar.set(this.refrescar() + 1))
    ).subscribe(()=> {
            this.snackBar.open('🍕 Curso grabado con éxito', 'Cerrar', {
          duration: 3000, // ms, se cierra solo
          horizontalPosition: 'right',
          verticalPosition: 'top',

          panelClass: 'custom-snackbar',
        });
    })


  }
}
