import { Component } from '@angular/core';
import { OutofstockService } from '../service/outofstock.service';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [],
  template: `
  `,
  styles: [`
    button {
      background-color: #139EC8;
      color: white;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 16px;
    }
    button:hover {
      background-color: #01599A;
    }
  `]
})
export class PruebaComponent {

  constructor(private outofstockService: OutofstockService) {}

}
