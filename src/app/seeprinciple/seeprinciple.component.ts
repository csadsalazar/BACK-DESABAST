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
import { ProductService } from '../service/product.service';

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
  tabs: { label: string, content: SafeHtml }[] = []; // Cambiar el nombre a tabs
  product: any;

  constructor(
    private route: ActivatedRoute,
    private activePrincipleService: ActivePrincipleService,
    private productService: ProductService, // Inyectar el servicio de productos
    private sanitizer: DomSanitizer
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

    // Cargar el principio activo
    this.activePrincipleService.get(id).subscribe(
      (data) => {
        this.principle = data;

        // Cargar los productos basados en el principio activo
        this.loadProducts(id); // Añadir este método
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener el detalle del principio activo', error);
        this.errorMessage = 'No se pudo cargar el detalle del principio activo.';
        this.isLoading = false;
      }
    );
  }

  loadProducts(id: number): void {
    this.productService.list().subscribe(
      (products) => {
        // Filtrar productos relacionados con el principio activo
        this.product = products.filter(p => p.activePrincipleFK.id === id);

        if (this.product.length > 0) {
          this.createTabs(this.product); // Crear las pestañas
        }
      },
      (error) => {
        console.error('Error al cargar productos', error);
        this.errorMessage = 'No se pudo cargar los productos.';
      }
    );
  }

  createTabs(products: any[]): void {
    console.log(products);
    // Crear pestañas dinámicas basadas en los productos
    this.tabs = products.map(product => ({
      label: product.productName,    
      content: this.sanitizer.bypassSecurityTrustHtml(`
      <section class="p-2 p-md-2 p-xl-3">
          <div class="container">
            <h1> <strong>Resumen general</strong></h1>
          </div>
          <div class="container">
            <h3><strong>Descripción del producto</strong></h3>
            <hr>
            <div class="row">
              <div class="col-md-4">
                <mat-card-title><strong>Grupo Terapeutico</strong></mat-card-title>
                <p class="text-left">${product.therapeuticGroupFK.therapeuticGroupName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Producto</strong></mat-card-title>
                <p class="text-left">${product.productName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Estado abastecimiento</strong></mat-card-title>
                <p class="text-left">${product.activePrincipleFK.activePrincipleDetailList.abastStatusFK.statusAbastName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Forma farmaceutica</strong></mat-card-title>
                <p class="text-left">${product.activePrincipleFK.pharmaceuticalFormFK.pharmaceuticalFormName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Codigo ATC</strong></mat-card-title>
                <p class="text-left">${product.activePrincipleFK.actCode}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Titular</strong></mat-card-title>
                <p class="text-left">${product.holderFK.contactName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Concentración</strong></mat-card-title>
                <p class="text-left">${product.activePrincipleFK.concentration}</p>
              </div>
            </div>
          </div>
          </section>

          <section class="p-2 p-md-2 p-xl-3">
          <div class="container">
            <h3><strong>Información de disponibilidad de medicamentos</strong></h3>
            <hr>
            <div class="row">
              <div class="col-md-4">
                <mat-card-title><strong>Fecha Reporte</strong></mat-card-title>
                <p class="text-left">${product.activePrincipleFK.technicalDetailFK.reportDate}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Estado registro sanitario</strong></mat-card-title>
                <p class="text-left">${product.registerStatus}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Causas</strong></mat-card-title>
                <p class="text-left">${product.activePrincipleFK.causeFK.causeName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Fecha inicio seguimiento</strong></mat-card-title>
                <p class="text-left">${product.activePrincipleFK.initialFollowUp}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Fecha ultimo seguimiento</strong></mat-card-title>
                <p class="text-left">${product.activePrincipleFK.finalFollowUp}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Fecha cierre</strong></mat-card-title>
                <p class="text-left">${product.activePrincipleFK.finishDate}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="p-2 p-md-2 p-xl-3">
          <div class="container">
            <h3><strong>Información canal institucional</strong></h3>
            <hr>
            <div class="row">
              <div class="col-md-4">
                <mat-card-title><strong>Canal institucional</strong></mat-card-title>
                <p class="text-left">${product.institutionalChannelFK.channelTypeFK.channelTypeName}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Ventas ${product.institutionalChannelFK.oneYear} (UMD)</strong></mat-card-title>
                <p class="text-left">${product.institutionalChannelFK.saleOne}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Ventas ${product.institutionalChannelFK.twoYear} (UMD)</strong></mat-card-title>
                <p class="text-left">${product.institutionalChannelFK.saleTwo}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Capacidad maxima UMD</strong></mat-card-title>
                <p class="text-left">${product.institutionalChannelFK.maxCapacity}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>${product.institutionalChannelFK.oneMonth} (UMD)</strong></mat-card-title>
                <p class="text-left">${product.institutionalChannelFK.commercialValueOne}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>${product.institutionalChannelFK.twoMonth} (UMD)</strong></mat-card-title>
                <p class="text-left">${product.institutionalChannelFK.commercialValueTwo}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>${product.institutionalChannelFK.threeMonth} (UMD)</strong></mat-card-title>
                <p class="text-left">${product.institutionalChannelFK.commercialValueThree}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>${product.institutionalChannelFK.fourMonth} (UMD)</strong></mat-card-title>
                <p class="text-left">${product.institutionalChannelFK.commercialValueFour}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Estado actual</strong></mat-card-title>
                <p class="text-left">${product.institutionalChannelFK.currentStatus}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Razones no comercialización</strong></mat-card-title>
                <p class="text-left">${product.institutionalChannelFK.reasonsNoCommercial}</p>
              </div>
              <div class="col-md-4">
                <mat-card-title><strong>Observaciones no comercialización</strong></mat-card-title>
                <p class="text-left">${product.institutionalChannelFK.observationsNoCommercial}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="p-2 p-md-2 p-xl-3">
            <div class="container">
              <h3><strong>Información canal comercial</strong></h3>
              <hr>
              <div class="row">
                <div class="col-md-4">
                  <mat-card-title><strong>Canal institucional</strong></mat-card-title>
                  <p class="text-left">${product.comertialChannelFK.channelTypeFK.channelTypeName}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Ventas ${product.comertialChannelFK.oneYear} (UMD)</strong></mat-card-title>
                  <p class="text-left">${product.comertialChannelFK.saleOne}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Ventas ${product.comertialChannelFK.twoYear} (UMD)</strong></mat-card-title>
                  <p class="text-left">${product.comertialChannelFK.saleTwo}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Capacidad maxima UMD</strong></mat-card-title>
                  <p class="text-left">${product.comertialChannelFK.maxCapacity}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>${product.comertialChannelFK.oneMonth} (UMD)</strong></mat-card-title>
                  <p class="text-left">${product.comertialChannelFK.commercialValueOne}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>${product.comertialChannelFK.twoMonth} (UMD)</strong></mat-card-title>
                  <p class="text-left">${product.comertialChannelFK.commercialValueTwo}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>${product.comertialChannelFK.threeMonth} (UMD)</strong></mat-card-title>
                  <p class="text-left">${product.comertialChannelFK.commercialValueThree}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>${product.comertialChannelFK.fourMonth} (UMD)</strong></mat-card-title>
                  <p class="text-left">${product.comertialChannelFK.commercialValueFour}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Estado actual</strong></mat-card-title>
                  <p class="text-left">${product.comertialChannelFK.currentStatus}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Razones no comercialización</strong></mat-card-title>
                  <p class="text-left">${product.comertialChannelFK.reasonsNoCommercial}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Observaciones no comercialización</strong></mat-card-title>
                  <p class="text-left">${product.comertialChannelFK.observationsNoCommercial}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="p-2 p-md-2 p-xl-3">
            <div class="container">
              <h3><strong>Resumen</strong></h3>
              <hr>
              <mat-card-title><strong>Observaciones Invima</strong></mat-card-title>
              <p class="text-left">${product.activePrincipleFK.summary}</p>
            </div>
          </section>
      `)
    }));
  }
}