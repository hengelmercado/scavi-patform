import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingComponent } from './setting/setting.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SettingComponent,
    PageTitleComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SettingComponent,
    PageTitleComponent,
    FooterComponent
  ]
})
export class SharedModule { }
