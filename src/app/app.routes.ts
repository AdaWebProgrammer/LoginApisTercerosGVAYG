import { Routes } from '@angular/router';
import { SiderbarComponent } from './shared/components/sidebar/sidebar.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { DashboardComponent } from './bussiness/dashboard/dashboard.component';
import { PerfilComponent } from './bussiness/perfil/perfil.component';
import { TablasComponent } from './bussiness/tablas/tablas.component';

export const routes: Routes = [
    {
        path: '',  // Ruta predeterminada para cargar HomeComponent al inicio
        loadComponent: () => import('./bussiness/login/login.component')
    },
    {
        path: 'login',  // Ruta alternativa para "home" que también carga HomeComponent
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'sidebar',  // Ruta predeterminada para cargar HomeComponent al inicio
        loadComponent: () => import('./shared/components/sidebar/sidebar.component').then(m=>SiderbarComponent)
    },
    {
        path: 'menu',  // Ruta predeterminada para cargar HomeComponent al inicio
        loadComponent: () => import('./shared/components/menu/menu.component').then(m=>MenuComponent)
    },
    {
        path: 'dashboard',  // Ruta predeterminada para cargar HomeComponent al inicio
        loadComponent: () => import('./bussiness/dashboard/dashboard.component').then(m=>DashboardComponent)
    },
    {
        path: 'perfil',  // Ruta predeterminada para cargar HomeComponent al inicio
        loadComponent: () => import('./bussiness/perfil/perfil.component').then(m=>PerfilComponent)
    },
    {
        path: 'tablas',  // Ruta predeterminada para cargar HomeComponent al inicio
        loadComponent: () => import('./bussiness/tablas/tablas.component').then(m=>TablasComponent)
    },
]