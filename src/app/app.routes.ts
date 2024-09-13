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
        path: 'see',
        loadComponent: () => import('./see/see.component')
    },


    {
        path: 'pruebas',
        loadComponent: () => import('./pruebas/pruebas.component')
    },

];
