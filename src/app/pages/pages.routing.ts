import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { PagesComponent } from './pages.component';

// COMPONENTS

const routes: Routes = [
    
    { 
        path: '',
        component: PagesComponent,
        children:
        [
          { path: 'dashboard', component: DashboardComponent, data:{ title: 'Dashboard' } },
          { path: 'clientes', component: ClientesComponent, data:{ title: 'Clientes' } },
          { path: 'productos', component: ProductosComponent, data:{ title: 'Productos' } },
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
