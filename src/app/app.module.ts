import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BuildComponent } from './build/build.component';
import { PredictComponent } from './predict/predict.component';
import { TrainingSeriesComponent } from './training-series/training-series.component';
import { TabsComponent } from './tabs/tabs.component';
import { NewmodelComponent } from './newmodel/newmodel.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ValidationsComponent } from './validations/validations.component';
import { ToastrModule } from 'ngx-toastr';
import { Model } from './Model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigTrainingComponent } from './config-training/config-training.component';
import { ConfigModelComponent } from './config-model/config-model.component';
import { ConfigPreferencesComponent } from './config-preferences/config-preferences.component';
import { ChecklistModule } from 'angular-checklist';

@NgModule({
  declarations: [
    AppComponent,
    BuildComponent,
    PredictComponent,
    TrainingSeriesComponent,
    TabsComponent,
    NewmodelComponent,
    SidebarComponent,
    ParametersComponent,
    ValidationsComponent,
    ConfigTrainingComponent,
    ConfigModelComponent,
    ConfigPreferencesComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChecklistModule
  ],
  entryComponents: [NewmodelComponent],
  providers: [Model],
  bootstrap: [AppComponent]
})

export class AppModule { }
