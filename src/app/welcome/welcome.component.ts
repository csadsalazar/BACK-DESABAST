import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule, MatChipsModule, MatCardModule, MatListModule, CommonModule, MatTabsModule, MatButtonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'] // Asegúrate de que sea styleUrls, no styleUrl
})
export class WelcomeComponent {

   // Lista de estados de desabastecimiento
   notas = [
    {
      label: 'Nota 1',
      content: `
        <p class="mt-3">Para los estados EN RIESGO DE DESABASTECIMIENTO Y DESABASTECIDO, el INVIMA implementará, según sea el caso, las siguientes estrategias de gestión ante el desabastecimiento de medicamentos a saber:</p>
        <ul>
          <li>La priorización de los trámites asociados al registro sanitario (Circular DG 1000-0012-2023)</li>
          <li>Autorización de Importación por única vez</li>
          <li>Declarar el medicamento como “vital no disponible”, siempre y cuando cumpla con lo establecido en el Decreto 481 de 2004</li>
          <li>Se sugiere alternativas terapéuticas disponibles en el mercado.</li>
        </ul>
        <strong>Lo anterior sólo aplicará para el principio activo, concentraciones y forma farmacéutica publicados en el presente listado.</strong>
      `
    },
    {
      label: 'Nota 2',
      content: `
        <p class="mt-3">Los reportes de disponibilidad informados por los titulares de los registros sanitarios en estado vigente y en trámite de renovación requeridos por el Invima, corresponden a las cantidades de unidades en unidades mínimas de dispensación - UMD (tabletas, cápsulas, ampollas, frascos, viales) disponibles para comercializar en el mes indicado tanto en el canal comercial como institucional (según corresponda). No se reportan en el presente listado unidades a exportar.</p>
      `
    },
    {
      label: 'Nota 3',
      content: `
        <p class="mt-3">Los seguimientos que se llevan a cabo en atención a las alertas de un posible riesgo de desabastecimiento se enfocan hacia los principios activos, concentraciones y forma farmacológica; más NO se realizan hacia marcas, laboratorios o registros sanitarios en específico.</p>
      `
    },
    {
      label: 'Nota 4',
      content: `
          <p class="mt-3"><strong>DESABASTECIDO **</strong></p>
          <p>Medicamento en estado desabastecido para el que se solicitó a La Sala Especializada de Medicamentos de la Comisión Revisora (SEM) la inclusión en el Listado de Medicamentos Vitales No Disponibles (LMVND) y está pendiente su pronunciamiento, ya que son quienes son la máxima autoridad para determinar si será o no incluido en el listado de medicamentos vitales no disponibles.</p>
          <p class="mt-3"><strong>DESABASTECIDO ***</strong></p>  
          <p>Medicamento en estado desabastecido que fue incluido como en el LISTADO DE MEDICAMENTOS VITALES NO DISPONIBLES (LMVND).</p>
          <p class="mt-3"><strong>DESABASTECIDO ****</strong></p> 
          <p>Medicamento en estado desabastecido que NO fue incluido en el LISTADO DE MEDICAMENTO VITAL NO DISPONIBLE (LMVND), por tener sustitutos de acuerdo al concepto de la Sala Especializada.</p> 
      `
    },
  ];

   statuses = [
    {
      label: 'Desabastecido',
      description: 'Situación donde existe una insuficiente oferta para satisfacer la demanda de un producto farmacéutico que ya ha sido aprobado por el Invima y comercializado en el país.',
      className: 'custom-chip-red'
    },
    {
      label: 'Descontinuado',
      description: 'Es la interrupción definitiva de la fabricación de Aquellos Ingredientes Farmacéuticos Activos (IFA) que se comercializaron en algún momento en el país y que, por decisión voluntaria del titular del registro sanitario deciden suspender la comercialización.',
      className: 'custom-chip-purple'
    },
    {
      label: 'En Monitorización',
      description: 'Seguimiento permanente, debido a que las cantidades disponibles reportadas por los titulares del registro sanitario de un medicamento en seguimiento son limitadas para los siguientes tres meses de comercialización.',
      className: 'custom-chip-yellow'
    },
    {
      label: 'No hay desabastecimiento',
      description: 'Cuando las cantidades reportadas por los titulares de los registros sanitarios son suficientes para satisfacer la demanda del medicamento a nivel nacional.',
      className: 'custom-chip-green'
    },
    {
      label: 'Riesgo de desabastecimiento',
      description: 'Cuando exista alguna contingencia o situación que pueda llevar en el corto o mediano plazo a que la oferta de un medicamento en seguimiento sea insuficiente para satisfacer las necesidades del país.',
      className: 'custom-chip-brown'
    },
    {
      label: 'Temporalmente no comercializado',
      description: 'Situaciones o incidentes que impiden la comercialización o que conllevan a una interrupción temporal o retiro definitivo del mercado local.',
      className: 'custom-chip-cyan'
    }
  ];

  activeStatusIndex: number | null = null;

  onMouseEnter(index: number) {
    this.activeStatusIndex = index;
  }

  onMouseLeave() {
    this.activeStatusIndex = null;
  }
}