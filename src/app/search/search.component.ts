import { Component, OnInit } from '@angular/core';
import { ActivePrincipleService, activePrinciple } from '../service/activeprinciple.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterLink, 
    CommonModule, 
    MatInputModule,
    MatButtonModule, 
    MatCardModule, 
    FormsModule, 
    MatChipsModule,
    MatSelectModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatRadioModule,
    MatExpansionModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit {
  activePrinciples: activePrinciple[] = []; // Lista para almacenar datos
  filteredPrinciples: activePrinciple[] = []; // Lista filtrada de principios activos
  isLoading: boolean = false; // Indicador de carga
  errorMessage: string = ''; // Para mostrar mensajes de error
  searchQuery: string = ''; // Texto de búsqueda
  panelOpenState = false;

  constructor(private activePrincipleService: ActivePrincipleService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadActivePrinciples();
  }

  loadActivePrinciples(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.activePrincipleService.list().subscribe(
      (data) => {
        this.activePrinciples = data;
        this.filteredPrinciples = data; // Inicialmente, mostrar todos los principios activos
        this.isLoading = false; // Datos cargados, ocultar indicador de carga
      },
      (error) => {
        console.error('Error al obtener los principios activos', error);
        this.errorMessage = 'No se pudieron cargar los datos.';
        this.isLoading = false; // Ocultar indicador de carga
      }
    );
  }

  // Método para filtrar los principios activos
  filterPrinciples(): void {
    const query = this.searchQuery.toLowerCase();
    
    // Filtrar los principios activos por nombre, concentración o forma farmacéutica
    this.filteredPrinciples = this.activePrinciples.filter(principle =>
      principle.activePrincipleName.toLowerCase().includes(query) ||
      principle.pharmaceuticalFormFK.pharmaceuticalFormName.toLowerCase().includes(query) ||
      principle.concentration.toLowerCase().includes(query)
    );
  }

  // Método para obtener la clase de la tarjeta
  getCardClass(status: string): string {
    switch (status) {
      case 'Desabastecido':
        return 'custom-chip-red';
      case 'Descontinuado':
        return 'custom-chip-purple';
      case 'En monitorización':
        return 'custom-chip-yellow';
      case 'No hay desabastecimiento':
        return 'custom-chip-green';
      case 'Riesgo de desabastecimiento':
        return 'custom-chip-brown';
      case 'Temporalmente no comercializado':
        return 'custom-chip-cyan';  
      default:
        return ''; // Si no hay estado, no aplicamos ninguna clase
    }
  }

  // Método para obtener la clase de la imagen
  getImageClass(status: string): string {
    switch (status) {
      case 'Desabastecido':
        return 'assets/images/backgrounds/Desabastecido.png';
      case 'Descontinuado':
        return 'assets/images/backgrounds/Descontinuado.png';
      case 'En monitorización':
        return 'assets/images/backgrounds/En Monitorización.png';
      case 'No hay desabastecimiento':
        return 'assets/images/backgrounds/No hay desabastecimiento.png';
      case 'Riesgo de desabastecimiento':
        return 'assets/images/backgrounds/En riesgo.png';
      case 'Temporalmente no comercializado':
        return 'assets/images/backgrounds/no comercializado.png';  
      default:
        return ''; // Si no hay estado, no mostramos ninguna imagen
    }
  }
}