import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './_layouts/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./_modules/student/student.module').then((m) => m.StudentModule),
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
