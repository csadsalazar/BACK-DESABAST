import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivePrincipleDetailService } from '../service/activeprincipledetail.service';

@Component({
  selector: 'app-seeprinciple',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './seeprinciple.component.html',
  styleUrls: ['./seeprinciple.component.css']
})
export class SeeprincipleComponent implements OnInit {
  principle: any = null;  // Cambiado para reflejar correctamente la respuesta
  detailList: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  tabs: { label: string, content: SafeHtml }[] = [];

  constructor(
    private route: ActivatedRoute,
    private activePrincipleDetailService: ActivePrincipleDetailService,
    private sanitizer: DomSanitizer,
    private router: Router // Inyecta el Router aquí

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    // Comprobamos si el id es válido
    if (!id || isNaN(+id)) {
      // Si no es válido, redirige a la página 404
      this.router.navigate(['/404']); 
    } else {
      // Si es válido, cargamos el principio activo
      this.loadPrincipleDetail(parseInt(id, 10));
    }
  }

  loadPrincipleDetail(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.activePrincipleDetailService.get(id).subscribe(
      (data) => {
        if (data) {
          this.principle = data;
          this.loadDetailList(data.details);
        } else {
          // Si no encontramos el principio activo, redirige a 404
          this.router.navigate(['/404']);
        }
      },
      (error) => {
        console.error('Error al obtener detalle', error);
        this.errorMessage = 'No se pudo cargar el detalle del principio activo.';
        this.isLoading = false;
        // Redirigir a la página de error si hay un problema con la solicitud
        this.router.navigate(['/404']);
      }
    );
  }
  
  loadDetailList(details: any[]): void {
    // Ahora ya tienes el arreglo 'details' directamente
    this.detailList = details;
    if (this.detailList.length > 0) {
      this.createTabs(this.detailList);
    }
    this.isLoading = false;
  }

  createTabs(details: any[]): void {
    this.tabs = details.map((detail) => {
      return {
        label: `${detail.productFK.holderFK.contactName || 'No encontrado'}`, 
        content: this.sanitizer.bypassSecurityTrustHtml(`
          <section class="p-2 p-md-2 p-xl-3">
            <div class="container">
              <h1><strong>Resumen general</strong></h1>
            </div>
            <div class="container">
              <h3><strong>Descripción del producto</strong></h3>
              <hr>
              <div class="row">
                <div class="col-md-4">
                  <mat-card-title><strong>Grupo Terapeutico</strong></mat-card-title>
                  <p class="text-left">${detail.productFK.therapeuticGroupFK.therapeuticGroupName || 'No encontrado'}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Producto</strong></mat-card-title>
                  <p class="text-left">${detail.productFK.productName || 'No encontrado'}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Estado abastecimiento</strong></mat-card-title>
                  <p class="text-left">${this.principle.abastStatusFK.statusAbastName || 'No encontrado'}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Forma farmaceutica</strong></mat-card-title>
                  <p class="text-left">${this.principle.activePrincipleFK.pharmaceuticalFormFK.pharmaceuticalFormName || 'No encontrado'}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Codigo ATC</strong></mat-card-title>
                  <p class="text-left">${this.principle.activePrincipleFK.atcCode || 'No encontrado'}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Titular</strong></mat-card-title>
                  <p class="text-left">${detail.productFK.holderFK.contactName || 'No encontrado'}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Concentración</strong></mat-card-title>
                  <p class="text-left">${this.principle.activePrincipleFK.concentration || 'No encontrado'}</p>
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
                  <p class="text-left">${this.principle.reportDate || 'No encontrado'}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Estado registro sanitario</strong></mat-card-title>
                  <p class="text-left">${detail.currentStatusRS || 'No encontrado'}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Causa</strong></mat-card-title>
                  <p class="text-left">${this.principle.causeFK.causeName || 'No encontrado'}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Fecha inicio seguimiento</strong></mat-card-title>
                  <p class="text-left">${this.principle.initialFollowUp || 'No encontrado'}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Fecha ultimo seguimiento</strong></mat-card-title>
                  <p class="text-left">${this.principle.finalFollowUp || 'No encontrado'}</p>
                </div>
                <div class="col-md-4">
                  <mat-card-title><strong>Fecha cierre</strong></mat-card-title>
                  <p class="text-left">${this.principle.finishDate || 'No encontrado'}</p>
                </div>
              </div>
            </div>
          </section>
  
          <section class="p-2 p-md-2 p-xl-3">
            <div class="container">
              <h3><strong>Información canal institucional</strong></h3>
              <hr>
              <div class="row">
                ${detail.institutionalChannelFK ? `
                  <div class="col-md-4">
                    <mat-card-title><strong>Canal institucional</strong></mat-card-title>
                    <p class="text-left">${detail.institutionalChannelFK.channelTypeFK.channelTypeName || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Ventas ${detail.institutionalChannelFK.oneYear} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.institutionalChannelFK.saleOne || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Ventas ${detail.institutionalChannelFK.twoYear} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.institutionalChannelFK.saleTwo || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Capacidad maxima UMD</strong></mat-card-title>
                    <p class="text-left">${detail.institutionalChannelFK.maxCapacity || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>${detail.institutionalChannelFK.oneMonth} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.institutionalChannelFK.commercialValueOne || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>${detail.institutionalChannelFK.twoMonth} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.institutionalChannelFK.commercialValueTwo || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>${detail.institutionalChannelFK.threeMonth} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.institutionalChannelFK.commercialValueThree || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>${detail.institutionalChannelFK.fourMonth} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.institutionalChannelFK.commercialValueFour || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Estado actual</strong></mat-card-title>
                    <p class="text-left">${detail.institutionalChannelFK.currentStatus || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Razones no comercialización</strong></mat-card-title>
                    <p class="text-left">${detail.institutionalChannelFK.reasonsNoCommercial || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Observaciones no comercialización</strong></mat-card-title>
                    <p class="text-left">${detail.institutionalChannelFK.observationsNoCommercial || 'Titular no reporta'}</p>
                  </div>
                ` : `
                  <div class="col-md-12">
                    <mat-card-title><strong>Canal institucional</strong></mat-card-title>
                    <p class="text-left">Titular no reporta</p>
                  </div>
                `}
              </div>
            </div>
          </section>
  
          <section class="p-2 p-md-2 p-xl-3">
            <div class="container">
              <h3><strong>Información canal comercial</strong></h3>
              <hr>
              <div class="row">
                ${detail.comertialChannelFK ? `
                  <div class="col-md-4">
                    <mat-card-title><strong>Canal comercial</strong></mat-card-title>
                    <p class="text-left">${detail.comertialChannelFK.channelTypeFK.channelTypeName || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Ventas ${detail.comertialChannelFK.oneYear} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.comertialChannelFK.saleOne || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Ventas ${detail.comertialChannelFK.twoYear} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.comertialChannelFK.saleTwo || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Capacidad maxima UMD</strong></mat-card-title>
                    <p class="text-left">${detail.comertialChannelFK.maxCapacity || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>${detail.comertialChannelFK.oneMonth} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.comertialChannelFK.commercialValueOne || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>${detail.comertialChannelFK.twoMonth} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.comertialChannelFK.commercialValueTwo || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>${detail.comertialChannelFK.threeMonth} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.comertialChannelFK.commercialValueThree || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>${detail.comertialChannelFK.fourMonth} (UMD)</strong></mat-card-title>
                    <p class="text-left">${detail.comertialChannelFK.commercialValueFour || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Estado actual</strong></mat-card-title>
                    <p class="text-left">${detail.comertialChannelFK.currentStatus || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Razones no comercialización</strong></mat-card-title>
                    <p class="text-left">${detail.comertialChannelFK.reasonsNoCommercial || 'Titular no reporta'}</p>
                  </div>
                  <div class="col-md-4">
                    <mat-card-title><strong>Observaciones no comercialización</strong></mat-card-title>
                    <p class="text-left">${detail.comertialChannelFK.observationsNoCommercial || 'Titular no reporta'}</p>
                  </div>
                ` : `
                  <div class="col-md-12">
                    <mat-card-title><strong>Canal comercial</strong></mat-card-title>
                    <p class="text-left">Titular no reporta</p>
                  </div>
                `}
              </div>
            </div>
          </section>
  
          <section class="p-2 p-md-2 p-xl-3">
            <div class="container">
              <h3><strong>Resumen</strong></h3>
              <hr>
              <mat-card-title><strong>Observaciones Invima</strong></mat-card-title>
              <p class="text-left">${this.principle.summary || 'No reportado'}</p>
            </div>
          </section>
        `)
      };
    });
  }  
}