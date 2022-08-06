import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { OverlayModule } from '@angular/cdk/overlay';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../_shared/components/pagination/pagination.component';
import { LoadingComponent } from '../_shared/components/loading/loading.component';
import { SingleDatePickerComponent } from '../_shared/components/single-date-picker/single-date-picker.component';
import { RangeDatePickerComponent } from '../_shared/components/range-date-picker/range-date-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    PaginationComponent,
    LoadingComponent,
    SingleDatePickerComponent,
    RangeDatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
    OverlayModule,
    NzNotificationModule,
    NgxDaterangepickerMd,
    NgbModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
    OverlayModule,
    NzNotificationModule,
    PaginationComponent,
    LoadingComponent,
    SingleDatePickerComponent,
    RangeDatePickerComponent
  ],
  providers: [

  ]
})
export class CoreModule {}
