import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// MODULES
import { PagesRoutingModule } from './pages/pages.routing';

// COMPONENTS
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [

  { path: '', component: PagesComponent },

  { path: 'login', component: LoginComponent, data:{ title: 'Login' } },

  { path: '**', component: NopagefoundComponent }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
