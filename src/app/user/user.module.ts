import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import {UserRoutingModule} from './user-routing.module';

@NgModule({
    declarations: [],
  imports: [
    CommonModule,
    UserComponent,
    UserRoutingModule,
  ]
})
export class UserModule { }
