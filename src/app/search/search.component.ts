import { Component, inject, OnInit } from '@angular/core';
import { OutofstockService } from '../service/outofstock.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'] // Corrige aquí
})
export class SearchComponent implements OnInit {
  outofstocks: any[] = [];
  private outOfStockService = inject(OutofstockService);

  ngOnInit(): void {
    this.outOfStockService.list()
      .subscribe((outofstocks: any) => {
        this.outofstocks = outofstocks;
      });
  }
}
