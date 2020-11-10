// Angular
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard.routing';
import { UserComponent } from './user/user.component';




@NgModule({
  imports: [
   CommonModule,
   FormsModule,
   ReactiveFormsModule,
DashboardRoutingModule
  ],
  declarations: [
    UserComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule { }
