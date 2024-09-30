import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule, MatChipsModule, MatCardModule, MatListModule, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'] // Asegúrate de que sea styleUrls, no styleUrl
})
export class WelcomeComponent {

   // Lista de estados de desabastecimiento
   statuses = [
    {
      label: 'Desabastecido',
      description: 'Situación donde existe una insuficiente oferta para satisfacer la demanda de un producto farmacéutico que ya ha sido aprobado por el Invima y comercializado en el país.',
      className: 'custom-chip-red'
    },
    {
      label: 'Descontinuado',
      description: 'Es la interrupción definitiva de la fabricación de Aquellos Ingredientes Farmacéuticos Activos (IFA) que se comercializaron en algún momento en el país y que, en la actualidad, por decisión voluntaria del titular del registro sanitario deciden suspender la comercialización.',
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

  desabasts = [
    {
      label: 'DESABASTECIDO **',
      description: 'Medicamento en estado desabastecido para el que se solicitó a La Sala Especializada de Medicamentos de la Comisión Revisora (SEM) la inclusión en el Listado de Medicamentos Vitales No Disponibles (LMVND) y está pendiente su pronunciamiento, ya que son quienes son la máxima autoridad para determinar si será o no incluido en el listado de medicamentos vitales no disponibles.'    
    },
    {
      label: 'DESABASTECIDO ***',
      description: 'Medicamento en estado desabastecido que fue incluido como en el LISTADO DE MEDICAMENTOS VITALES NO DISPONIBLES (LMVND).' 
    },
    {
      label: 'DESABASTECIDO ****',
      description: 'Medicamento en estado desabastecido que NO fue incluido en el LISTADO DE MEDICAMENTO VITAL NO DISPONIBLE (LMVND), por tener sustitutos de acuerdo al concepto de la Sala Especializada.'
    }
  ];

}