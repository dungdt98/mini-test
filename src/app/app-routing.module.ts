import { DemoComponent } from './_modules/demo/demo/demo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './_layouts/default-layout/default-layout.component';
import { DemoModule } from './_modules/demo/demo.module';

const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./_modules/task/task.module').then((m) => m.TaskModule),
      },
      // {
      //   path: '',
      //   loadChildren: () => DemoModule
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
