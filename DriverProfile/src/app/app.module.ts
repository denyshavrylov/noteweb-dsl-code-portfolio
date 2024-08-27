import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormioModule} from '@formio/angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { DriverDetailComponent } from './form-document-detail/driver-form-document-detail.component';
import { DriverGridComponent } from './form-document-grid/driver-form-document-grid.component';

@NgModule({
  declarations: [
    AppComponent,
          DriverDetailComponent,
      DriverGridComponent      ],
  imports: [
    BrowserModule, FormsModule, FormioModule, HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
