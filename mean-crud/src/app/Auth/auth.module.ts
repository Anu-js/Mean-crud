import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],

})
export class AuthModule { }
