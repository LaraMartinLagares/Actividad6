import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { Error404Component } from './pages/error404/error404.component';
import { ErrorAPIComponent } from './pages/error-api/error-api.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo:"home"},
    { path: "home", component: UsersListComponent},
    { path: "newuser", component: UserFormComponent},
    { path: "user/:_id", component: UserViewComponent},
    { path: "updateuser/:_id", component: UserFormComponent},
    { path: "error", component: ErrorAPIComponent},
    { path: "**", component: Error404Component} 

];