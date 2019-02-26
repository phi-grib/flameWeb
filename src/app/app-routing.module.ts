import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildComponent } from './build/build.component';
import { PredictComponent } from './predict/predict.component';
import { CommonModule } from '@angular/common';
//import { TrainingSeriesComponent } from './training-series/training-series.component';

const routes: Routes = [
  /*{
    path: 'training-series',
    component: TrainingSeriesComponent
  },*/
  {
    path: '',
    redirectTo: '/build',
    pathMatch: 'full'
  },
  {
    path: 'build',
    component: BuildComponent
  },
  {
    path: 'predict',
    component: PredictComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
