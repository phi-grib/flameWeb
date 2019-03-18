import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildComponent } from './build/build.component';
import { PredictComponent } from './predict/predict.component';
import { CommonModule } from '@angular/common';
import { TrainingSeriesComponent } from './training-series/training-series.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ValidationsComponent } from './validations/validations.component';


const routes: Routes = [
  /*{
    path: 'training-series',
    component: TrainingSeriesComponent
  },*/
  {
    path: '',
    redirectTo: '/build',
    pathMatch: 'full',
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'build',
    component: BuildComponent
  },
  {
    path: 'parameters',
    component: ParametersComponent
  },
  {
    path: 'trainigseries',
    component: TrainingSeriesComponent
  },
  {
    path: 'validation',
    component: ValidationsComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
