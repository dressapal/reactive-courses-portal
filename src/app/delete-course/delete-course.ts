import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Curso } from '../sharing/models/course';

@Component({
  selector: 'app-delete-course',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './delete-course.html',
  styleUrl: './delete-course.css'
})
export class DeleteCourse {


    dialogRef = inject(MatDialogRef<DeleteCourse>);
    curso = structuredClone(inject(MAT_DIALOG_DATA) as Curso);


 cerrar() {
    this.dialogRef.close();
  }

  eliminar() {
   this.dialogRef.close(this.curso);
  }


}
