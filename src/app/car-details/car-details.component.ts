import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CarService } from '../car.service';
import { Car } from '../car';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  car: Car;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCar();
  }

  getCar(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carService.getCar(id).subscribe(car => this.car = car);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.carService.updateCar(this.car.id, this.car)
      .subscribe(() => this.goBack());
  }

}
