import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./welcome/welcome.component')
    },
    {
        path: 'search',
        loadComponent: () => import('./search/search.component')
    },
    {
        path: 'see/:id',
        loadComponent: () => import('./see/see.component') // Usa `m.default` si usas exportación por defecto
    },
    {
        path: 'pruebas',
        loadComponent: () => import('./pruebas/pruebas.component')
    },
];
