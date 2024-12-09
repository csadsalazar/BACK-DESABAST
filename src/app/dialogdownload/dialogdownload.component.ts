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