import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutofstockService } from '../service/outofstock.service';

@Component({
  selector: 'app-see',
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
    this.outofstockService.get(id).subscribe(data => {
      this.outofstock = data;
    });
  }
}
