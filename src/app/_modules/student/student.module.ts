import { CoreModule } from 'src/app/_core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ListStudentComponent } from './list-student/list-student.component';
import { ModalFormStudentComponent } from './modal-form-student/modal-form-student.component';
import { ModalDeleteStudentComponent } from './modal-delete-student/modal-delete-student.component';


@NgModule({
  declarations: [
    ListStudentComponent,
    ModalFormStudentComponent,
    ModalDeleteStudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    CoreModule
  ]
})
export class StudentModule { }
