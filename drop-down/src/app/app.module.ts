import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DropdownTriggerForDirective } from './dropdown/directives/dropdown-trigger-for.directive';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    DropdownComponent,
    DropdownTriggerForDirective,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
