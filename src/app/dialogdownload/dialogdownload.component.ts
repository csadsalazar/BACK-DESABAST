import { AbastStatusService } from './../service/abaststatus.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatSelectModule } from '@angular/material/select'
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductService } from '../service/product.service';
import { FormsModule } from '@angular/forms';
import { ActivePrincipleService } from '../service/activeprinciple.service';
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
  styleUrl: './dialogdownload.component.css'
})
export class DialogdownloadComponent implements OnInit {
  names: string[] = [];
  statuses: string[] = [];
  atcCodes: string[] = [];

  selectedNames: string[] = [];
  selectedAtcCodes: string[] = [];
  selectedAbastStatuses: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogdownloadComponent>,
    private productService: ProductService,
    private activePrincipleService: ActivePrincipleService,
    private abastStatusService: AbastStatusService
  ) {}

  ngOnInit(): void {
    this.activePrincipleService.getNames().subscribe((data) => {
      this.names = data;
    });
    this.activePrincipleService.getAtcCodes().subscribe((data) => {
      this.atcCodes = data;
    });
    this.abastStatusService.getNames().subscribe((data) => {
      this.statuses = data;
    });
  }

  downloadReport(): void {
    this.productService
      .downloadExcel(this.selectedAtcCodes, this.selectedAbastStatuses, this.selectedNames)
      .subscribe(
        (response) => {
          const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'report.xlsx';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        (error) => {
          console.error('Error al descargar el reporte:', error);
          alert('No hay datos para descargar con los filtros seleccionados.');
        }
      );
  }
  
  clearFilters(): void {
    this.selectedNames = [];
    this.selectedAtcCodes = [];
    this.selectedAbastStatuses = [];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}