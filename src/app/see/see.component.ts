import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutofstockService, Outofstock } from '../service/abaststatus.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-see',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatGridListModule, CommonModule], 
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.css']
})
export class SeeComponent implements OnInit {
  outofstock!: Outofstock; // Use non-null assertion or make it optional
  isLoading = true; // To manage loading state
  
  constructor(private outofstockService: OutofstockService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.outofstockService.get(id).subscribe({
      next: (data) => {
        this.outofstock = data;
        this.isLoading = false; // Set loading to false once data is fetched
      },
      error: (error) => {
        console.error('Error fetching out-of-stock item:', error);
        this.isLoading = false; // Stop loading even on error
      }
    });
  }
}