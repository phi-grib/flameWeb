import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ModelListComponent } from './model-list/model-list.component';
import { TrainingSeriesComponent } from './training-series/training-series.component';
import { TabsComponent } from './tabs/tabs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ValidationsComponent } from './validations/validations.component';
import { ToastrModule } from 'ngx-toastr';
import { Model, Prediction, Globlas } from './Global';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigTrainingComponent } from './config-training/config-training.component';
import { ConfigModelComponent } from './config-model/config-model.component';
import { ConfigPreferencesComponent } from './config-preferences/config-preferences.component';
import { ChecklistModule } from 'angular-checklist';
import { ChartsModule } from 'ng2-charts';
import { QualitNoConformalComponent } from './qualit-no-conformal/qualit-no-conformal.component';
import { QualitConformalComponent } from './qualit-conformal/qualit-conformal.component';
import { QuantitNoConformalComponent } from './quantit-no-conformal/quantit-no-conformal.component';
import { QuantitConformalComponent } from './quantit-conformal/quantit-conformal.component';
import { BuilderComponent } from './builder/builder.component';
import { PredictorComponent } from './predictor/predictor.component';
import { ManagerComponent } from './manager/manager.component';
import { PredictionSeriesComponent } from './prediction-series/prediction-series.component';
import { PredictionComponent } from './prediction/prediction.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelListComponent,
    TrainingSeriesComponent,
    TabsComponent,
    SidebarComponent,
    ParametersComponent,
    ValidationsComponent,
    ConfigTrainingComponent,
    ConfigModelComponent,
    ConfigPreferencesComponent,
    QualitNoConformalComponent,
    QualitConformalComponent,
    QuantitNoConformalComponent,
    QuantitConformalComponent,
    BuilderComponent,
    PredictorComponent,
    ManagerComponent,
    PredictionSeriesComponent,
    PredictionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChecklistModule,
    ChartsModule
  ],
  providers: [Model, Prediction, Globlas],
  bootstrap: [AppComponent]
})

export class AppModule { }
