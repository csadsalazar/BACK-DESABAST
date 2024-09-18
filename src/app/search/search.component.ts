import { Component, inject, OnInit } from '@angular/core';
import { OutofstockService } from '../service/outofstock.service';
import {ThemePalette} from '@angular/material/core';
import { RouterLink } from '@angular/router';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export default class SearchComponent implements OnInit{
  
  outofstocks: any[] = [];

  private outOfStockService = inject(OutofstockService);

  ngOnInit(): void {
    this.outOfStockService.list()
    .subscribe((outofstocks: any) => {
      this.outofstocks = outofstocks;
    })
  }
}