import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { PreventivosComponent } from './preventivos/preventivos.component';
import { CorrectivosComponent } from './correctivos/correctivos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PipesModule } from '../pipes/pipes.module';
import { CreatepreventivesComponent } from './components/createpreventives/createpreventives.component';
import { CreatecorrectivesComponent } from './components/createcorrectives/createcorrectives.component';
import { AssignClientComponent } from './components/assign-client/assign-client.component';

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
    SidebarComponent,
    PreventivosComponent,
    CorrectivosComponent,
    PerfilComponent,
    CreatepreventivesComponent,
    CreatecorrectivesComponent,
    AssignClientComponent
  ],
  exports:[
    DashboardComponent,
    ProductosComponent,
    ClientesComponent,
    UsuariosComponent,
    PagesComponent,
    PreventivosComponent,
    CorrectivosComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
    
  ]
})
export class PagesModule { }
