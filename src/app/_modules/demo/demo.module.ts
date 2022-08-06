
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { DemoComponent } from './demo/demo.component';
import { CoreModule } from 'src/app/_core/core.module';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ModalDemoComponent, DemoComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    NzInputModule,
    NzSelectModule,
    NzDropDownModule,
    NzCheckboxModule,
    CoreModule,
    NzSwitchModule,
    NgbModule
  ]
})
export class DemoModule { }
