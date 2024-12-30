import { Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';

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
        path: 'seeprinciple/:id',
        loadComponent: () => import('./seeprinciple/seeprinciple.component').then(m => m.SeeprincipleComponent)
    },

    { 
        path: '**', component: Error404Component 
    }
];
