import { Component, OnInit } from '@angular/core';
import { activePrincipleService, activePrinciple } from '../service/activeprinciple.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    // Importaciones necesarias
    RouterLink, 
    CommonModule, 
    MatInputModule,
    MatButtonModule, 
    MatCardModule, 
    FormsModule, 
    MatChipsModule,
    MatSelectModule,
    MatListModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  activePrinciples: activePrinciple[] = []; // Lista para almacenar datos
  filteredCount: number = 0; // Número de resultados filtrados
  searchTerm: string = ''; // Término de búsqueda

  constructor(private activePrincipleService: activePrincipleService) {}

  ngOnInit(): void {
    this.loadActivePrinciples(); // Cargar datos al inicializar
  }

  loadActivePrinciples(): void {
    this.activePrincipleService.list().subscribe({
      next: (data) => {
        this.activePrinciples = data;
        this.filteredCount = this.activePrinciples.length; // Actualizar el contador de resultados
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
      },
    });
  }
}