import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { RouterModule } from '@angular/router';

// COMPONENTS
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProductosComponent,
    ClientesComponent,
    UsuariosComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    SidebarComponent
  ],
  exports:[
    DashboardComponent,
    ProductosComponent,
    ClientesComponent,
    UsuariosComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class PagesModule { }
