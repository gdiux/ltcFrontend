import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { PagesComponent } from './pages.component';
import { CorrectivosComponent } from './correctivos/correctivos.component';
import { PreventivosComponent } from './preventivos/preventivos.component';
import { PerfilComponent } from './perfil/perfil.component';

// COMPONENTS

const routes: Routes = [
    
    { 
        path: 'dashboard',
        component: PagesComponent,
        children:
        [
          { path: '', component: DashboardComponent, data:{ title: 'Dashboard' } },
          { path: 'clientes', component: ClientesComponent, data:{ title: 'Clientes' } },
          { path: 'correctivos', component: CorrectivosComponent, data:{ title: 'Correctivos' } },
          { path: 'preventivos', component: PreventivosComponent, data:{ title: 'Preventivos' } },
          { path: 'productos', component: ProductosComponent, data:{ title: 'Productos' } },
          { path: 'perfil', component: PerfilComponent, data:{ title: 'Perfil' } },
          { path: 'usuarios', component: UsuariosComponent, data:{ title: 'Usuarios' } },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ] 
      },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
