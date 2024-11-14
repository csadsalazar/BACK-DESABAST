  import { Component, Inject, OnInit, ViewChild } from '@angular/core';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { OutofstockService } from '../service/abaststatus.service';
  import { CommonModule } from '@angular/common';
  import { MatButtonModule } from '@angular/material/button';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatSelect, MatSelectModule } from '@angular/material/select';
  import { MatInputModule } from '@angular/material/input';
  import { MatDialogModule } from '@angular/material/dialog';
  import { MatExpansionModule } from '@angular/material/expansion';

  @Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [
      CommonModule,
      MatButtonModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatDialogModule,
      MatExpansionModule
    ],
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
  })

  export class DialogComponent implements OnInit {
    activePrinciples: string[] = [];
    atcList: string[] = [];
    abastStatusList: string[] = [];
    selectedActivePrinciples: string[] = [];
    selectedAtc: string[] = [];
    selectedAbastStatus: string[] = [];
  
    @ViewChild('principlesSelect') principlesSelect!: MatSelect; // Usa el operador '!' para asegurar que se inicializará
    @ViewChild('atcSelect') atcSelect!: MatSelect; // Usa el operador '!'
    @ViewChild('abastStatusSelect') abastStatusSelect!: MatSelect; // Usa el operador '!'
  
    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private outOfStockService: OutofstockService
    ) {}
  
    ngOnInit(): void {
      this.loadActivePrinciples();
      this.loadAtc();
      this.loadAbastStatus();
    }
  
    loadActivePrinciples() {
      this.outOfStockService.findAllActivePrinciples().subscribe((data) => {
        this.activePrinciples = data.filter(principle => principle); // Filtra valores vacíos
      });
    }
  
    loadAtc() {
      this.outOfStockService.findAllAtc().subscribe((data) => {
        this.atcList = data.filter(atc => atc); // Filtra valores vacíos
      });
    }
  
    loadAbastStatus() {
      this.outOfStockService.findAllAbastStatus().subscribe((data) => {
        this.abastStatusList = data.filter(status => status); // Filtra valores vacíos
      });
    }
  
    // Función para limpiar las selecciones y cerrar el desplegable
    clearSelection(selectionType: string) {
      if (selectionType === 'principles') {
        this.selectedActivePrinciples = [];
        this.principlesSelect.close(); // Cierra el select de Principios Activos
      } else if (selectionType === 'atc') {
        this.selectedAtc = [];
        this.atcSelect.close(); // Cierra el select de ATC
      } else if (selectionType === 'abastStatus') {
        this.selectedAbastStatus = [];
        this.abastStatusSelect.close(); // Cierra el select de Estado de Abastecimiento
      }
    }
    
  downloadExcel() {
    const selectedActivePrinciplesString = this.selectedActivePrinciples.join(',');
    const selectedAtcString = this.selectedAtc.join(',');
    const selectedAbastStatusString = this.selectedAbastStatus.join(',');

    this.outOfStockService.downloadExcel(
      selectedActivePrinciplesString,
      selectedAtcString,
      selectedAbastStatusString
    ).subscribe(blob => {
      this.handleExcelDownload(blob, 'reporte.xlsx');
    }, error => {
      console.error('Error al descargar el archivo Excel:', error);
    });
  }

  private handleExcelDownload(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    // Expandible
    panelOpenState = false;
  }

  