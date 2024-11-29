import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatSelectModule } from '@angular/material/select'
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-dialogdownload',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSelect,
    MatSelectModule,
    MatExpansionModule
  ],
  templateUrl: './dialogdownload.component.html',
  styleUrl: './dialogdownload.component.css'
})
export class DialogdownloadComponent {

  constructor(public dialogRef: MatDialogRef<DialogdownloadComponent>) {}

  closeDialog(): void {
    this.dialogRef.close(); // Cierra el diálogo sin hacer nada
  }

  downloadReport(): void {
    // Lógica para descargar el reporte (esto dependerá de tu implementación)
    console.log('Reporte descargado');

    // Cerrar el diálogo después de la descarga
    this.dialogRef.close();
  }
}
