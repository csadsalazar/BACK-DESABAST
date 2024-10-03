import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent)
    },
    {
        path: 'search',
        loadComponent: () => import('./search/search.component').then(m => m.SearchComponent)
    },
    {
        path: 'see/:id',
        loadComponent: () => import('./see/see.component').then(m => m.SeeComponent)
    },
    {
        path: 'prueba',
        loadComponent: () => import('./prueba/prueba.component').then(m => m.PruebaComponent)
    },
];
