import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import {UserFormComponent} from './user-form/user-form.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'add-user', component: UserFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
