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
        this.createTabs(); // Crea los tabs dinámicos después de cargar los datos
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener el detalle del principio activo', error);
        this.errorMessage = 'No se pudo cargar el detalle del principio activo.';
        this.isLoading = false;
      }
    );
  }

  createTabs(): void {
    if (this.principle?.productList) {
      this.notas = this.principle.productList.map(product => ({
        label: product.holderFK.contactName,
        content: this.sanitizer.bypassSecurityTrustHtml(`
          <section class="p-2 p-md-2 p-xl-3">
          <div class="container">
            <h1> <strong>Resumen general</strong></h1>
          </div>
          <div class="container">
            <mat-card-title><strong>Descripción del producto</strong></mat-card-title>
            <hr>
            <div class="row">
              <div class="col-md-4">
                <mat-card-title><strong>Grupo Terapeutico</strong></mat-card-title>
                <p class="text-left">${product.terapeuticGroupFK.therapeuticGroupName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title>Producto</mat-card-title>
                <p class="text-left">${product.productName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title>Estado abastecimiento</mat-card-title>
                <p class="text-left">${product.activePrincipleFK.abastStatusFK.statusAbastName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title >Forma farmaceutica</mat-card-title>
                <p class="text-left">${product.activePrincipleFK.pharmaceuticalFormFK.pharmaceuticalFormName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title>Codigo ATC</mat-card-title>
                <p class="text-left">${product.activePrincipleFK.actCode}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title >Titular</mat-card-title>
                <p class="text-left">${product.holderFK.contactName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title>Concentración</mat-card-title>
                <p class="text-left">${product.activePrincipleFK.concentration}</p>
              </div>
            </div>
          </div>
          </section>

          <section class="p-2 p-md-2 p-xl-3">
          <div class="container">
            <mat-card-title><strong>Información de disponibilidad de medicamentos</strong></mat-card-title>
            <hr>
            <div class="row">
              <div class="col-md-4">
                <mat-card-title>Fecha Reporte</mat-card-title>
                <p class="text-left">${product.activePrincipleFK.technicalDetailFK.reportdate}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title>Estado registro sanitario</mat-card-title>
                <p class="text-left">${product.registerStatus}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title>Causas</mat-card-title>
                <p class="text-left">${product.activePrincipleFK.causeFK.causeName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title>Fecha inicio seguimiento</mat-card-title>
                <p class="text-left">${product.activePrincipleFK.initialFollowUp}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title>Fecha ultimo seguimiento</mat-card-title>
                <p class="text-left">${product.activePrincipleFK.finalFollowUp}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title>Fecha cierre</mat-card-title>
                <p class="text-left">${product.activePrincipleFK.finishDate}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="p-2 p-md-2 p-xl-3">
          <div class="container">
            <mat-card-title><strong>Información canal institucional</strong></mat-card-title>
            <hr>
            <div class="row">
              <div class="col-md-4">
                <mat-card-title>Canal institucional</mat-card-title>
                <p class="text-left">{{ outofstock.institutionalchannel }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.institutionalyearone">
                <mat-card-title>Ventas 2023 (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.institutionalyearone }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.institutionalyeartwo">
                <mat-card-title>Ventas 2024 (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.institutionalyeartwo }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.institutionalcapmax">
                <mat-card-title>Capacidad maxima UMD</mat-card-title>
                <p class="text-left">{{ outofstock.institutionalcapmax }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.institutionalvalueone">
                <mat-card-title>Agosto (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.institutionalvalueone }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.institutionalvaluetwo">
                <mat-card-title>Septiembre (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.institutionalvaluetwo }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.institutionalvaluethree">
                <mat-card-title>Octubre (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.institutionalvaluethree }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.institutionalvaluefour">
                <mat-card-title>Noviembre (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.institutionalvaluefour }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.institutionalcurrentstatus">
                <mat-card-title>Estado actual</mat-card-title>
                <p class="text-left">{{ outofstock.institutionalcurrentstatus }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.institutionalreasonsnottrade">
                <mat-card-title>Razones no comercialización</mat-card-title>
                <p class="text-left">{{ outofstock.institutionalreasonsnottrade }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.institutionalobsnotcommerce">
                <mat-card-title>Observaciones no comercialización</mat-card-title>
                <p class="text-left">{{ outofstock.institutionalobsnotcommerce }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="p-2 p-md-2 p-xl-3">
          <div class="container">
            <mat-card-title><strong>Información canal comercial</strong></mat-card-title>
            <hr>
            <div class="row">
              <div class="col-md-4">
                <mat-card-title>Canal comercial</mat-card-title>
                <p class="text-left">{{ outofstock.commercialchannel }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.commercialyearone">
                <mat-card-title>Ventas 2023 (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.commercialyearone }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.commercialyeartwo">
                <mat-card-title>Ventas 2024 (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.commercialyeartwo }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.commercialcapmax">
                <mat-card-title>Capacidad maxima UMD</mat-card-title>
                <p class="text-left">{{ outofstock.commercialcapmax }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.commercialvalueone">
                <mat-card-title>Agosto (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.commercialvalueone }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.commercialvaluetwo">
                <mat-card-title>Septiembre (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.commercialvaluetwo }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.commercialvaluethree">
                <mat-card-title>Octubre (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.commercialvaluethree }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.commercialvaluefour">
                <mat-card-title>Noviembre (UMD)</mat-card-title>
                <p class="text-left">{{ outofstock.commercialvaluefour }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.commercialcurrentstatus">
                <mat-card-title>Estado actual</mat-card-title>
                <p class="text-left">{{ outofstock.commercialcurrentstatus }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.commercialreasonsnottrade">
                <mat-card-title>Razones no comercialización</mat-card-title>
                <p class="text-left">{{ outofstock.commercialreasonsnottrade }}</p>
              </div>
              <div class="col-md-4" *ngIf="outofstock.commercialobsnotcommerce">
                <mat-card-title>Observaciones no comercialización</mat-card-title>
                <p class="text-left">{{ outofstock.commercialobsnotcommerce }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="p-2 p-md-2 p-xl-3">
          <div class="container">
            <mat-card-title><strong>Resumen</strong></mat-card-title>
            <hr>
            <mat-card-title>Observaciones Invima</mat-card-title>
            <p class="text-left">{{ outofstock.resofinv }}</p>
          </div>
        </section>

        `)
      }));
    }
  }
}