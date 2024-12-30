import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivePrincipleService } from '../service/activeprinciple.service';
import { ActivePrincipleDetailService } from '../service/activeprincipledetail.service';
import { AbastStatusService } from '../service/abaststatus.service';
import { HttpClient } from '@angular/common/http';  // Importamos HttpClient para las peticiones HTTP
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatSelectModule } from '@angular/material/select'
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-dialogdownload',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSelect,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './dialogdownload.component.html',
  styleUrls: ['./dialogdownload.component.css']
})
export class DialogdownloadComponent implements OnInit {
  months: string[] = [];
  years: number[] = [];
  principles: string[] = [];
  statuses: string[] = [];
  codes: string[] = [];
  selectedMonths: string[] = [];
  selectedYears: number[] = [];
  selectedPrinciples: string[] = [];
  selectedStatuses: string[] = [];
  selectedCodes: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogdownloadComponent>,
    private detail: ActivePrincipleDetailService,  // Inyectamos el servicio
    private principle: ActivePrincipleService,
    private status: AbastStatusService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadDistinctMonths();
    this.loadDistinctYears();
    this.loadDistinctPrinciples();
    this.loadDistinctStatuses();
    this.loadDistinctCodes();
  }

  // Llamadas a los métodos para cargar los filtros
  loadDistinctMonths(): void {
    this.detail.getDistinctMonths().subscribe(
      (data: string[]) => {
        this.months = data;
      },
      error => {
        console.error('Error al obtener los meses', error);
      }
    );
  }

  loadDistinctYears(): void {
    this.detail.getDistinctYears().subscribe(
      (data: number[]) => {
        this.years = data;
      },
      error => {
        console.error('Error al obtener los años', error);
      }
    );
  }

  loadDistinctPrinciples(): void {
    this.principle.getDistinctPrinciples().subscribe(
      (data: string[]) => {
        this.principles = data;
      },
      error => {
        console.error('Error al obtener los principios', error);
      }
    );
  }

  loadDistinctStatuses(): void {
    this.status.getDistinctStatus().subscribe(
      (data: string[]) => {
        this.statuses = data;
      },
      error => {
        console.error('Error al obtener los estados', error);
      }
    );
  }

  loadDistinctCodes(): void {
    this.principle.getDistinctCodes().subscribe(
      (data: string[]) => {
        this.codes = data;
      },
      error => {
        console.error('Error al obtener los ATC', error);
      }
    );
  }

  clearFilters(): void {
    this.selectedMonths = [];
    this.selectedYears = [];
    this.selectedPrinciples = [];
    this.selectedStatuses = [];
    this.selectedCodes = [];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Método para generar y descargar el archivo Excel
  downloadExcel(): void {
    const params = {
      month: this.selectedMonths.join(','),  // Unimos los meses seleccionados en una cadena
      year: this.selectedYears.join(','),    // Unimos los años seleccionados
      activePrinciple: this.selectedPrinciples.join(','),
      atcCode: this.selectedCodes.join(','),
      abastStatus: this.selectedStatuses.join(',')
    };

    this.detail.downloadExcel(params).subscribe(
      (response: ArrayBuffer) => {
        // Crear un Blob a partir de la respuesta y disparar la descarga
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'reporte_activos.xlsx';
        link.click();
      },
      error => {
        console.error('Error al descargar el archivo Excel', error);
      }
    );
  }
}