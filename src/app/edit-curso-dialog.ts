import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Curso } from './sharing/models/course';
import { Service } from './service/service';

@Component({
  selector: 'app-edit-curso-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-curso-dialog.html',
  standalone: true,
  styles: ``
})
export class EditCursoDialog {

  dialogRef = inject(MatDialogRef<EditCursoDialog>);
  curso = structuredClone(inject(MAT_DIALOG_DATA) as Curso);
  cursoService = inject(Service);


   cerrar() {
    this.dialogRef.close();
  }

  guardar() {
   this.dialogRef.close(this.curso);
  }

}
