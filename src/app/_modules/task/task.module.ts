import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTaskComponent } from './list-task/list-task.component';
import { ModalFormTaskComponent } from './modal-form-task/modal-form-task.component';
import { TaskRoutingModule } from './task-routing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    ListTaskComponent,
    ModalFormTaskComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    CoreModule,
    NzDropDownModule
  ]
})
export class TaskModule { }
