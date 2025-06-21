import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCursoDialog } from './edit-curso-dialog';

describe('EditCursoDialog', () => {
  let component: EditCursoDialog;
  let fixture: ComponentFixture<EditCursoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCursoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCursoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
