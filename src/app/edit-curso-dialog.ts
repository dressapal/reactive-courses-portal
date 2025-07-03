import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Curso } from './sharing/models/course';
import { Service } from './service/service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-curso-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDatepickerModule,
  ],
  templateUrl: './edit-curso-dialog.html',
  standalone: true,
  styles: ``
})
export class EditCursoDialog {

  data = inject(MAT_DIALOG_DATA, { optional: true }) || {};
  curso = structuredClone(this.data as Curso);



  dialogRef = inject(MatDialogRef<EditCursoDialog>);

  cursoService = inject(Service);
  esEdicion = !!this.curso?._id;

  constructor(){
  this.curso.fechaInicio = this.curso.fechaInicio ? new Date(this.curso.fechaInicio) : null;

  }


   cerrar() {
    this.dialogRef.close();
  }

  guardar() {
   this.dialogRef.close(this.curso);
  }

}
