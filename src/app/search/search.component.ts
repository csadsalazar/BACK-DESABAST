import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { OutofstockService } from '../service/outofstock.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatCardModule, MatPaginator, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  outofstocks: any[] = [];
  pagedOutofstocks: any[] = [];
  totalLength: number = 0;
  pageSize: number = 5; // Cantidad de elementos por página
  currentPage: number = 0; // Página actual

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private outOfStockService = inject(OutofstockService);

  ngOnInit(): void {
    this.outOfStockService.list()
      .subscribe((outofstocks: any) => {
        this.outofstocks = outofstocks;
        this.totalLength = outofstocks.length;
        this.updatePagedOutofstocks();
      });
  }

  updatePagedOutofstocks() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedOutofstocks = this.filteredOutofstocks.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedOutofstocks();
  }

  get filteredOutofstocks() {
    if (!this.searchTerm) {
      return this.outofstocks;
    }
    return this.outofstocks.filter(outofstock => {
      const product = (outofstock.product || '').toLowerCase();
      const summary = (outofstock.summary || '').toLowerCase();
      const atc = (outofstock.atc || '').toLowerCase();
      const record = String(outofstock.record || ''); // Convierte a string
      const registrationstatus = (outofstock.registrationstatus || '').toLowerCase();

      return product.includes(this.searchTerm.toLowerCase()) ||
             summary.includes(this.searchTerm.toLowerCase()) ||
             atc.includes(this.searchTerm.toLowerCase()) ||
             record.includes(this.searchTerm.toLowerCase()) ||
             registrationstatus.includes(this.searchTerm.toLowerCase());
    });
  }
}