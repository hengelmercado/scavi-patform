import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { ModalsComponent } from '../components/modals/modals.component';
import { TableComponent } from '../components/table/table.component';
import { FormInstrumentComponent } from './instrument/form-instrument.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    NopagefoundComponent,
    InstrumentComponent,
    ModalsComponent,
    TableComponent,
    FormInstrumentComponent
  ],
  imports: [
    PAGES_ROUTES,
    SharedModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    DashboardComponent,
    NopagefoundComponent,
    InstrumentComponent,
    ModalsComponent,
  ]
})
export class PagesModule { }
