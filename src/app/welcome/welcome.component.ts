import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule, MatChipsModule, MatCardModule, MatListModule, CommonModule, MatTabsModule, MatButtonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'] // Asegúrate de que sea styleUrls, no 
})
export class WelcomeComponent {

  selectedButton: string | null = 'assets/images/backgrounds/Desabastecido.png';
  selectedLabel: string | null = 'Desabastecido';
  selectedText: string | null = 'Situación donde existe una insuficiente oferta para satisfacer la demanda de un producto farmacéutico que ya ha sido aprobado por el Invima y comercializado en el país.';
  cardColor: string = '#e2504c'; // Color por defecto

  buttons = [
    { label: 'Desabastecido', color: '#e2504c', imageUrl: 'assets/images/backgrounds/Desabastecido.png', text: 'Situación donde existe una insuficiente oferta para satisfacer la demanda de un producto farmacéutico que ya ha sido aprobado por el Invima y comercializado en el país.' },
    { label: 'Descontinuado', color: '#7f00b2', imageUrl: 'assets/images/backgrounds/Descontinuado.png', text: 'Es la interrupción definitiva de la fabricación de Aquellos Ingredientes Farmacéuticos Activos (IFA) que se comercializaron en algún momento en el país y que, por decisión voluntaria del titular del registro sanitario deciden suspender la comercialización.' },
    { label: 'En monitorización', color: '#ff9800', imageUrl: 'assets/images/backgrounds/En Monitorización.png', text: 'Seguimiento permanente, debido a que las cantidades disponibles reportadas por los titulares del registro sanitario de un medicamento en seguimiento son limitadas para los siguientes tres meses de comercialización.' },
    { label: 'No hay desabastecimiento', color: '#42ab49', imageUrl: 'assets/images/backgrounds/No hay desabastecimiento.png', text: 'Cuando las cantidades reportadas por los titulares de los registros sanitarios son suficientes para satisfacer la demanda del medicamento a nivel nacional.' },
    { label: 'Riesgo de desabastecimiento', color: '#c19982', imageUrl: 'assets/images/backgrounds/En riesgo.png', text: 'Cuando exista alguna contingencia o situación que pueda llevar en el corto o mediano plazo a que la oferta de un medicamento en seguimiento sea insuficiente para satisfacer las necesidades del país.' },
    { label: 'Temporalmente no comercializado', color: '#00cbcc', imageUrl: 'assets/images/backgrounds/no comercializado.png', text: 'Situaciones o incidentes que impiden la comercialización o que conllevan a una interrupción temporal o retiro definitivo del mercado local.' },
    { label: 'Sin estado de abastecimiento', color: 'gray', imageUrl: 'assets/images/backgrounds/base.png', text: 'Principios activos los cuales no cuentan aun con un estado de abastecimiento.'}
  ];

  onButtonClick(button: any) {
    this.selectedButton = button.imageUrl; // Guarda la URL de la imagen seleccionada
    this.selectedLabel = button.label; // Guarda el titulo de la opcion selecionada
    this.selectedText = button.text; // Guarda el texto de la opcion selecionada
    this.cardColor = button.color; // Cambia el color de la card
  }
  
   // Lista de estados de desabastecimiento
   notas = [
    {
      label: 'Aclaración',
      content: `
        <p class="mt-3"><strong>RECUERDE:</strong> EL PRESENTE LISTADO ES UN LISTADO DE DIAGNOSTICO, NO DE PRONOSTICO. Por cuanto es el resultado de un proceso dinámico que depende de la oportunidad y calidad en la información reportada por los titulares en diferentes meses del año y la evidenciada en el SISMED. Por ejemplo, un medicamento puede estar desabastecido en un tiempo específico, pero puede luego cambiar su estado a monitorización o no desabastecidos meses después. Por tanto, su consulta debe ser mensual.</p>
      `
    },
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
        <p class="mt-3">Los reportes de disponibilidad informados por los titulares de los registros sanitarios en estado vigente requeridos por el Invima, corresponden a las cantidades de unidades en unidades mínimas de dispensación - UMD (tabletas, cápsulas, ampollas, frascos, viales) disponibles para comercializar en el mes indicado tanto en el canal comercial como institucional (según corresponda). No se reportan en el presente listado unidades a exportar. Los seguimientos que se llevan a cabo en atención a las alertas de un posible riesgo de desabastecimiento se enfocan hacia los principios activos, concentraciones y forma farmacéutica; más NO se realizan hacia marcas, laboratorios o registros sanitarios en específico.</p>
      `
    },
    {
      label: 'Nota 3',
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

  activeStatusIndex: number | null = null;

  onMouseEnter(index: number) {
    this.activeStatusIndex = index;
  }

  onMouseLeave() {
    this.activeStatusIndex = null;
  }
}