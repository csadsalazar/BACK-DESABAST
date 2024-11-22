import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivePrincipleService, activePrinciple } from '../service/activeprinciple.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// Importar módulos de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-seeprinciple',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatStepperModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './seeprinciple.component.html',
  styleUrl: './seeprinciple.component.css'
})
export class SeeprincipleComponent implements OnInit {
  principle: activePrinciple | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  notas: { label: string, content: string }[] = []; // Notas dinámicas para los tabs

  constructor(
    private route: ActivatedRoute,
    private activePrincipleService: ActivePrincipleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPrincipleDetail(parseInt(id, 10));
    }
  }

  loadPrincipleDetail(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.activePrincipleService.get(id).subscribe(
      (data) => {
        this.principle = data;
        this.createTabs(); // Crea los tabs dinámicos después de cargar los datos
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener el detalle del principio activo', error);
        this.errorMessage = 'No se pudo cargar el detalle del principio activo.';
        this.isLoading = false;
      }
    );
  }

  // Función para crear dinámicamente los tabs a partir de los productos
  createTabs(): void {
    if (this.principle?.productList) {
      this.notas = this.principle.productList.map(product => ({
        label: product.holderFK.contactName,  // Título del tab
        content: `

          <p class="mt-3"><strong>Expediente:</strong> ${product.record}</p>
          <p><strong>Email Titular:</strong> ${product.holderEmail}</p>
          <p><strong>Concentración:</strong> ${product.concentration}</p>
          <p><strong>Estado de registro:</strong> ${product.registerStatus}</p>
          <p><strong>Canal institucional:</strong> ${product.institutionalChannelFK.channelTypeFK.name}</p>
          <p><strong>Canal comercial:</strong> ${product.comertialChannelFK.channelTypeFK.name}</p>
          <p><strong>Principio activo:</strong> ${product.activePrincipleFK.activePrincipleName}</p>
          <p><strong>Grupo terapéutico:</strong> ${product.terapeuticGroupFK.therapeuticGroupName}</p>
          <p><strong>Forma farmacéutica:</strong> ${product.pharmaceuticalFormFK.pharmaceuticalFormName}</p>
          <p><strong>Titular:</strong> ${product.holderFK.contactName}</p>
        `
      }));
    }
  }
}