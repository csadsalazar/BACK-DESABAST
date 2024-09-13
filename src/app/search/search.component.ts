import { Component, inject, OnInit } from '@angular/core';
import { OutofstockService } from '../service/outofstock.service';
import {ThemePalette} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})


export default class SearchComponent implements OnInit{
  
  availableColors: ChipColor[] = [
    {name: 'none', color: undefined},
    {name: 'Primary', color: 'primary'},
    {name: 'Accent', color: 'accent'},
    {name: 'Warn', color: 'warn'},
  ];

  outofstocks: any[] = [];

  private outOfStockService = inject(OutofstockService);

  ngOnInit(): void {
    this.outOfStockService.list()
    .subscribe((outofstocks: any) => {
      this.outofstocks = outofstocks;
    })
  }
}