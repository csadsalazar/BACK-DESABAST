  import { Component, OnInit, inject, ViewChild, Inject } from '@angular/core';
  import { OutofstockService } from '../service/abaststatus.service';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { MatCardModule } from '@angular/material/card';
  import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
  import { PageEvent } from '@angular/material/paginator';
  import { RouterLink } from '@angular/router';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { MatChipsModule } from '@angular/material/chips';
  import { DialogService } from '../service/dialog.service';
  import { MatSelectModule } from '@angular/material/select';
  import { MatListModule } from '@angular/material/list';

  export function customPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = 'Registros por página';
    paginatorIntl.nextPageLabel = 'Siguiente';
    paginatorIntl.previousPageLabel = 'Anterior';

    paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const startIndex = page * pageSize + 1;
      const endIndex = Math.min(startIndex + pageSize - 1, length);
      return `${startIndex} - ${endIndex} de ${length}`; 
    };

    return paginatorIntl;
  }

  @Component({
    selector: 'app-search',
    standalone: true,
    imports: [
      RouterLink, 
      CommonModule, 
      MatInputModule,
      MatButtonModule, 
      MatCardModule, 
      MatPaginatorModule, 
      FormsModule, 
      MatChipsModule,
      MatSelectModule,
      MatListModule
    ],
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [
      { provide: MatPaginatorIntl, useValue: customPaginatorIntl() }
    ]
  })

  export class SearchComponent implements OnInit {
    searchTerm: string = '';
    outofstocks: any[] = [];
    filteredCount: number = 0;
    pagedOutofstocks: any[] = [];
    totalLength: number = 0;
    pageSize: number = 5; 
    currentPage: number = 0; 
    abastStatusList: string[] = []; 
    selectedAbastStatus: string | undefined; 

    constructor(
      private readonly dialogservice: DialogService,
    ){ }

    openDialog() {
      this.dialogservice.openDialog();
    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    private outOfStockService = inject(OutofstockService);

    ngOnInit(): void {
      this.outOfStockService.list()
        .subscribe((outofstocks: any) => {
          this.outofstocks = outofstocks;
          this.totalLength = outofstocks.length;
          this.updatePagedOutofstocks();
        });

      this.outOfStockService.findAllAbastStatus().subscribe((data) => {
        this.abastStatusList = data;
      });
    }

    updatePagedOutofstocks() {
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.pagedOutofstocks = this.filteredOutofstocks.slice(start, end);
      
      this.filteredCount = this.filteredOutofstocks.length;
    }

    get filteredOutofstocks() {
      let filtered = this.outofstocks;

      // Filtrar por estado de abastecimiento
      if (this.selectedAbastStatus) {
        filtered = filtered.filter(outofstock => outofstock.abaststatus === this.selectedAbastStatus);
      }

      // Filtrar por término de búsqueda 
      if (this.searchTerm) {
        filtered = filtered.filter(outofstock => {
          const product = (outofstock.product || '').toLowerCase();
          const activeprinciple = (outofstock.activeprinciple || '').toLowerCase();
          const atc = (outofstock.atc || '').toLowerCase();
          const record = String(outofstock.record || ''); 
          const abaststatus = (outofstock.abaststatus || '').toLowerCase();

          return product.includes(this.searchTerm.toLowerCase()) ||
                activeprinciple.includes(this.searchTerm.toLowerCase()) ||
                atc.includes(this.searchTerm.toLowerCase()) ||
                record.includes(this.searchTerm.toLowerCase()) ||
                abaststatus.includes(this.searchTerm.toLowerCase());
        });
      }

      return filtered;
    }

    onPageChange(event: PageEvent) {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePagedOutofstocks();
    }

    getColorClass(status: string): string {
      switch (status) {
        case 'No hay desabastecimiento':
          return 'custom-chip-green';
        case 'En monitorizacion':
          return 'custom-chip-yellow';
        case 'Riesgo de desabastecimiento':
          return 'custom-chip-brown';
        case 'Desabastecido':
          return 'custom-chip-red';
        case 'Temporalmente no comercializado': 
          return 'custom-chip-cyan';
        case 'Descontinuado':
          return 'custom-chip-purple';
        default:
          return 'custom-chip-basic'; 
      }
    }

    // Método para obtener la ruta de la imagen según el estado
    getImageByStatus(status: string): string {
      switch (status) {
        case 'No hay desabastecimiento':
          return 'assets/images/backgrounds/No hay desabastecimiento.png';
        case 'En monitorizacion':
          return 'assets/images/backgrounds/En Monitorización.png';
        case 'Riesgo de desabastecimiento':
          return 'assets/images/backgrounds/En riesgo.png';
        case 'Desabastecido':
          return 'assets/images/backgrounds/Desabastecido.png';
        case 'Temporalmente no comercializado':
          return 'assets/images/backgrounds/no comercializado.png';
        case 'Descontinuado':
          return 'assets/images/backgrounds/Descontinuado.png';
        default:
          return 'assets/images/backgrounds/default.png'; // Imagen por defecto en caso de que no coincida con ningún estado
      }
    }
  }