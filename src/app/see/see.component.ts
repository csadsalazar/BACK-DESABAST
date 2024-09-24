import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutofstockService } from '../service/outofstock.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list'; // Importar MatGridListModule

@Component({
  selector: 'app-see',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatGridListModule], // Añadir aquí
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.css']
})
export class SeeComponent implements OnInit {
  outofstock: any;

  constructor(
    private route: ActivatedRoute,
    private outofstockService: OutofstockService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.outofstockService.get(id).subscribe({
      next: (data) => {
        this.outofstock = data;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }  
}