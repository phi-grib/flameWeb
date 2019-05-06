import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelListComponent } from './model-list/model-list.component';
import { CommonModule } from '@angular/common';
import { TrainingSeriesComponent } from './training-series/training-series.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ValidationsComponent } from './validations/validations.component';
import { PredictionSeriesComponent } from './prediction-series/prediction-series.component';
import { PredictionComponent } from './prediction/prediction.component';


const routes: Routes = [
  /*{
    path: 'training-series',
    component: TrainingSeriesComponent
  },*/
  {
    path: '',
    redirectTo: '/listModel',
    pathMatch: 'full'
  },
  {
    path: 'listModel',
    component: ModelListComponent
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
  {
    path: 'predictionseries',
    component: PredictionSeriesComponent
  },
  {
    path: 'prediction',
    component: PredictionComponent
  },
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
