import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BuildComponent } from './build/build.component';
import { PredictComponent } from './predict/predict.component';
import { TrainingSeriesComponent } from './training-series/training-series.component';
import { TabsComponent } from './tabs/tabs.component';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { NewmodelComponent } from './newmodel/newmodel.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ValidationsComponent } from './validations/validations.component';
import { Model } from './Model';
import { FileSelectDirective } from 'ng2-file-upload';

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
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalDialogModule.forRoot()
  ],
  entryComponents: [NewmodelComponent],
  providers: [Model],
  bootstrap: [AppComponent]
})
export class AppModule { }
