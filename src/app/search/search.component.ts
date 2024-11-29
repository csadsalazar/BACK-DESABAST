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
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { DialogdownloadComponent } from '../dialogdownload/dialogdownload.component';  // Asegúrate de importar el nuevo componente


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
  activePrinciples: activePrinciple[] = [];
  filteredPrinciples: activePrinciple[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  searchQuery: string = '';
  selectedStatus: string = '';
  selectedAtcCode: string = '';
  selectedPharmaceuticalForm: string = '';
  panelOpenState = false;
  abastecimientoOptions: string[] = []; // Array for abastecimiento options
  pharmaceuticalFormOptions: string[] = []; // Array for pharmaceutical form options
  atcCodeOptions: string[] = []; // Array for ATC code options
  
  constructor(
    private activePrincipleService: ActivePrincipleService, 
    private paginatorIntl: MatPaginatorIntl,     
    private dialog: MatDialog  
  ) {
        // Personaliza los textos directamente aquí
        this.paginatorIntl.itemsPerPageLabel = 'Items por página'; // Cambiar "items per page"
        this.paginatorIntl.nextPageLabel = 'Siguiente página';     // Cambiar "next page"
        this.paginatorIntl.previousPageLabel = 'Anterior página';  // Cambiar "previous page"
            // Personaliza el formato del rango (por ejemplo, "1-10 de 200")
        this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = Math.min((page + 1) * pageSize, length);
          return `${start} - ${end} de ${length}`; // Personalizamos "of" a "de"
        }
      }
  
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    this.loadActivePrinciples();
  }

  loadActivePrinciples(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.activePrincipleService.list().subscribe(
      (data) => {
        this.activePrinciples = data;
        this.filteredPrinciples = data; // Initially, show all active principles
        this.abastecimientoOptions = [...new Set(data.map(p => p.abastStatusFK.statusAbastName))];
        this.pharmaceuticalFormOptions = [...new Set(data.map(p => p.pharmaceuticalFormFK.pharmaceuticalFormName))];
        this.atcCodeOptions = [...new Set(data.map(p => p.actCode))];
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los principios activos', error);
        this.errorMessage = 'No se pudieron cargar los datos.';
        this.isLoading = false;
      }
    );
  }

  // Filter method
  filterPrinciples(): void {
    const query = this.searchQuery.toLowerCase();
  
    this.filteredPrinciples = this.activePrinciples.filter(principle => {
      // Filtros por estado, ATC y forma farmacéutica
      const matchesStatus = this.selectedStatus ? principle.abastStatusFK.statusAbastName === this.selectedStatus : true;
      const matchesAtc = this.selectedAtcCode ? principle.actCode === this.selectedAtcCode : true;
      const matchesForm = this.selectedPharmaceuticalForm ? principle.pharmaceuticalFormFK.pharmaceuticalFormName === this.selectedPharmaceuticalForm : true;
  
      // Filtro de búsqueda adicional
      const matchesQuery = principle.activePrincipleName.toLowerCase().includes(query) ||
                           principle.pharmaceuticalFormFK.pharmaceuticalFormName.toLowerCase().includes(query) ||
                           principle.concentration.toLowerCase().includes(query);
  
      // Devuelve el principio si cumple todos los filtros
      return matchesStatus && matchesAtc && matchesForm && matchesQuery;
    });
  }

  clearFilters(): void {
    this.selectedStatus = '';
    this.selectedAtcCode = '';
    this.selectedPharmaceuticalForm = '';
    this.searchQuery = '';  // Limpiar la consulta de búsqueda
    this.filterPrinciples();  // Volver a aplicar el filtro, que ahora mostrará todos los elementos sin filtros
  }
  
  // Optional: Handle search query filtering
  searchFilter(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredPrinciples = this.activePrinciples.filter(principle =>
      principle.activePrincipleName.toLowerCase().includes(query) ||
      principle.pharmaceuticalFormFK.pharmaceuticalFormName.toLowerCase().includes(query) ||
      principle.concentration.toLowerCase().includes(query)
    );
  }

    // Método para abrir el diálogo de descarga
    openDownloadDialog(): void {
      this.dialog.open(DialogdownloadComponent, {
        width: '400px',  // Puedes ajustar el tamaño del diálogo aquí
      });
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
        return 'assets/images/backgrounds/base.png';
    }
  }
}