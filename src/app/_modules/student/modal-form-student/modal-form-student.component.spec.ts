import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormStudentComponent } from './modal-form-student.component';

describe('ModalFormStudentComponent', () => {
  let component: ModalFormStudentComponent;
  let fixture: ComponentFixture<ModalFormStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
