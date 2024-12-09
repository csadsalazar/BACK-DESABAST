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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  notas: { label: string, content: SafeHtml }[] = []; // Cambiar el tipo a SafeHtml

  constructor(
    private route: ActivatedRoute,
    private activePrincipleService: ActivePrincipleService,
    private sanitizer: DomSanitizer  // Agregar el servicio DomSanitizer
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
        //this.createTabs(); // Crea los tabs dinámicos después de cargar los datos
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