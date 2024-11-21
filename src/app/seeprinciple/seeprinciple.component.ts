import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivePrincipleService, activePrinciple } from '../service/activeprinciple.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seeprinciple',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './seeprinciple.component.html',
  styleUrl: './seeprinciple.component.css'
})
export class SeeprincipleComponent implements OnInit {
  principle: activePrinciple | null = null; // Variable para almacenar los detalles del principio activo
  isLoading: boolean = true; // Indicador de carga
  errorMessage: string = ''; // Para mensajes de error

  constructor(
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private activePrincipleService: ActivePrincipleService // Para obtener los detalles del principio activo
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la URL
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      // Cargar los detalles del principio activo usando el ID
      this.loadPrincipleDetail(parseInt(id, 10));
    }
  }

  loadPrincipleDetail(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.activePrincipleService.get(id).subscribe(
      (data) => {
        this.principle = data;
        console.log('Principio Activo:', data);  // Agrega este log
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener el detalle del principio activo', error);
        this.errorMessage = 'No se pudo cargar el detalle del principio activo.';
        this.isLoading = false;
      }
    );
  }
  
}