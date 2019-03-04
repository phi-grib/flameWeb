import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BuildComponent } from './build/build.component';
import { PredictComponent } from './predict/predict.component';
import { TrainingSeriesComponent } from './training-series/training-series.component';
import { TabsComponent } from './tabs/tabs.component';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { NewmodelComponent } from './newmodel/newmodel.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildComponent,
    PredictComponent,
    TrainingSeriesComponent,
    TabsComponent,
    NewmodelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalDialogModule.forRoot()
  ],
  entryComponents: [NewmodelComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
