import { ActivePrincipleService } from './../service/activeprinciple.service';
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
import { AbastStatusService } from '../service/abaststatus.service';
import { PharmaceuticalFormService } from '../service/pharmaceuticalform.service';

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
  panelOpenState = false;
  // Agregar esta variable
  currentPageResultsCount: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  activePrinciplesDetail: activePrincipleDetail[] = [];
  filteredActivePrinciplesDetail: activePrincipleDetail[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  searchQuery: string = '';
  selectedStatuses: string[] = [];
  selectedMonths: string[] = [];
  selectedYears: string[] = [];
  selectedAtcCodes: string[] = [];
  selectedPharmaceuticalForms: string[] = [];
  abastOptions: string[] = [];
  monthOptions: string[] = [];
  yearOptions: string[] = [];
  pharmaceuticalFormOptions: string[] = [];
  atcCodeOptions: string[] = [];

  constructor(
    private activePrincipleService: ActivePrincipleDetailService,
    private abastStatus: AbastStatusService,
    private activePrinciple: ActivePrincipleService,
    private pharmaceuticalForm: PharmaceuticalFormService,
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
    this.loadMonthsAndYears();
    this.loadActivePrinciplesDetail();
  }

  loadMonthsAndYears(): void {
    // Cargar los meses desde la API
    this.activePrincipleService.getDistinctMonths().subscribe(
      (data) => {
        this.monthOptions = data;
      },
      (error) => {
        console.error('Error al obtener los meses', error);
      }
    );

    // Cargar los años desde la API
    this.activePrincipleService.getDistinctYears().subscribe(
      (data) => {
        // Convertir los valores de los años a cadenas (string)
        this.yearOptions = data.map((year: number) => year.toString());
      },
      (error) => {
        console.error('Error al obtener los años', error);
      }
    );

    // Cargar los estados de abastecimineto desde la API
    this.abastStatus.getDistinctStatus().subscribe(
      (data) => {
        this.abastOptions = data;
      },
      (error) => {
        console.error('Error al obtener los estados', error);
      }
    );

    // Cargar las formas farmaceuticas desde la API
    this.pharmaceuticalForm.getDistinctForms().subscribe(
      (data) => {
        this.pharmaceuticalFormOptions = data;
      },
      (error) => {
        console.error('Error al obtener las formas', error);
      }
    );

    // Cargar las formas farmaceuticas desde la API
    this.activePrinciple.getDistinctCodes().subscribe(
      (data) => {
        this.atcCodeOptions = data;
      },
      (error) => {
        console.error('Error al obtener los atc', error);
      }
    );
  }

    // Establecer los filtros por defecto a los más recientes (año y mes más reciente)
    setDefaultFilters(): void {
      const mostRecent = this.filteredActivePrinciplesDetail[0]; // Suponiendo que ya está ordenado por fecha descendente
      if (mostRecent) {
        this.selectedYears = [mostRecent.insertYear.toString()];
        this.selectedMonths = [mostRecent.insertMonth];
        this.filterActivePrinciplesDetail(); // Filtrar de acuerdo a estos valores predeterminados
      }
    }
    
  loadActivePrinciplesDetail(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.activePrincipleService.list().subscribe(
      (data) => {
        this.activePrinciplesDetail = data;
        this.filteredActivePrinciplesDetail = this.sortByDate(data);
        this.setDefaultFilters(); // Establecer los filtros por defecto para el mes y año más reciente

        // Extraer las opciones únicas de Forma Farmacéutica y Código ATC
        this.pharmaceuticalFormOptions = [...new Set(data.map((item) => item.activePrincipleFK.pharmaceuticalFormFK.pharmaceuticalFormName))];
        this.atcCodeOptions = [...new Set(data.map((item) => item.activePrincipleFK.atcCode))];

        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los principios activos', error);
        this.errorMessage = 'No se pudieron cargar los datos.';
        this.isLoading = false;
      }
    );
  }

  // Función para ordenar por año (descendente) y mes (descendente)
  sortByDate(data: activePrincipleDetail[]): activePrincipleDetail[] {
    return data.sort((a, b) => {
      const yearA = a.insertYear;
      const yearB = b.insertYear;
      const monthA = this.monthOptions.indexOf(a.insertMonth);
      const monthB = this.monthOptions.indexOf(b.insertMonth);

      // Primero ordenamos por año descendente
      if (yearA !== yearB) {
        return yearB - yearA; // Orden descendente
      }

      // Si los años son iguales, ordenamos por mes descendente
      return monthB - monthA;
    });
  }

  filterActivePrinciplesDetail(): void {
    const query = this.searchQuery.toLowerCase();

    // Filtrar por los filtros seleccionados
    this.filteredActivePrinciplesDetail = this.activePrinciplesDetail.filter((detail) => {
      const matchesStatus = this.selectedStatuses.length === 0 || this.selectedStatuses.includes(detail.abastStatusFK.statusAbastName);
      const matchesAtc = this.selectedAtcCodes.length === 0 || this.selectedAtcCodes.includes(detail.activePrincipleFK.atcCode);
      const matchesMonth = this.selectedMonths.length === 0 || this.selectedMonths.includes(detail.insertMonth);
      const matchesYear = this.selectedYears.length === 0 || this.selectedYears.includes(detail.insertYear.toString());
      const matchesForm = this.selectedPharmaceuticalForms.length === 0 || this.selectedPharmaceuticalForms.includes(detail.activePrincipleFK.pharmaceuticalFormFK.pharmaceuticalFormName);
      const matchesQuery =
        detail.activePrincipleFK.activePrincipleName.toLowerCase().includes(query) ||
        detail.activePrincipleFK.pharmaceuticalFormFK.pharmaceuticalFormName.toLowerCase().includes(query) ||
        detail.activePrincipleFK.concentration.toLowerCase().includes(query) ||
        detail.activePrincipleFK.atcCode.toLowerCase().includes(query) ||
        detail.abastStatusFK.statusAbastName.toLowerCase().includes(query);

      return matchesStatus && matchesAtc && matchesForm && matchesQuery && matchesMonth && matchesYear;
    });

    // Ordenar los resultados filtrados
    this.filteredActivePrinciplesDetail = this.sortByDate(this.filteredActivePrinciplesDetail);

    // Después de filtrar, actualizamos la página actual para que no se quede en una página con resultados vacíos
    this.updatePaginator();
  }

  updatePaginator(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.filteredActivePrinciplesDetail = this.filteredActivePrinciplesDetail.slice(startIndex, startIndex + this.pageSize);
  
    // Calcular cuántos resultados se están mostrando en la página actual
    this.currentPageResultsCount = this.filteredActivePrinciplesDetail.length;
  }
  

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.filterActivePrinciplesDetail(); // Aplicar filtros antes de la paginación
  }

  clearFilters(): void {
    this.selectedStatuses = [];
    this.selectedAtcCodes = [];
    this.selectedPharmaceuticalForms = [];
    this.searchQuery = '';
    this.filterActivePrinciplesDetail();
  }

  openDownloadDialog(): void {
    this.dialog.open(DialogdownloadComponent, {
      width: '800px',
      height: '600px'
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
        return '';
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