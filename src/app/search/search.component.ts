import { Component, OnInit } from '@angular/core';
import { ActivePrincipleDetailService, activePrincipleDetail } from '../service/activeprincipledetail.service';
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
import { DialogdownloadComponent } from '../dialogdownload/dialogdownload.component';


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
  panelOpenState = false
  activePrinciples: activePrincipleDetail[] = [];
  filteredPrinciples: activePrincipleDetail[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  searchQuery: string = '';
  selectedStatuses: string[] = [];
  selectedAtcCodes: string[] = [];
  selectedPharmaceuticalForms: string[] = [];
  abastecimientoOptions: string[] = ['Desabastecido', 'En monitorización', 'Descontinuado', 'No hay desabastecimiento', 'Riesgo de desabastecimiento', 'Temporalmente no comercializado']; // Opciones predefinidas
  monthOptions: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']; // Opciones predefinidas
  yearOptions: string[] = [];
  pharmaceuticalFormOptions: string[] = []; 
  atcCodeOptions: string[] = []; 

  constructor(
    private activePrincipleService: ActivePrincipleDetailService,
    private paginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog
  ) {
    // Personalización de los textos del paginator
    this.paginatorIntl.itemsPerPageLabel = 'Items por página';
    this.paginatorIntl.nextPageLabel = 'Siguiente página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = Math.min((page + 1) * pageSize, length);
      return `${start} - ${end} de ${length}`;
    };
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
        this.filteredPrinciples = data; // Inicialmente mostramos todos los principios activos
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los principios activos', error);
        this.errorMessage = 'No se pudieron cargar los datos.';
        this.isLoading = false;
      }
    );
  }

  filterPrinciples(): void {
    const query = this.searchQuery.toLowerCase();

    this.filteredPrinciples = this.activePrinciples.filter((principle) => {
      const matchesStatus = this.selectedStatuses.length === 0 || this.selectedStatuses.includes(principle.abastStatusFK.statusAbastName);
      const matchesAtc = this.selectedAtcCodes.length === 0 || this.selectedAtcCodes.includes(principle.activePrincipleFK.atcCode);
      const matchesForm = this.selectedPharmaceuticalForms.length === 0 || this.selectedPharmaceuticalForms.includes(principle.activePrincipleFK.pharmaceuticalFormFK.pharmaceuticalFormName);
      const matchesQuery = principle.activePrincipleFK.activePrincipleName.toLowerCase().includes(query) ||
        principle.activePrincipleFK.concentration.toLowerCase().includes(query);

      return matchesStatus && matchesAtc && matchesForm && matchesQuery;
    });
  }

  clearFilters(): void {
    this.selectedStatuses = [];
    this.selectedAtcCodes = [];
    this.selectedPharmaceuticalForms = [];
    this.searchQuery = '';
    this.filterPrinciples();
  }

  openDownloadDialog(): void {
    this.dialog.open(DialogdownloadComponent, {
      width: '400px',
    });
  }

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