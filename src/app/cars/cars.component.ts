import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../car';
import { Brand } from '../car';
import { Observable, Timestamp } from 'rxjs';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[];
  newDate: Date = new Date();

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars().subscribe(data => this.cars = data);
  }

  add(country: string, createdAt: Date, registration: Date, lastUpdated: Date): void {
    this.carService.addCar({country: country, brand: {id: 5, name: 'iscing elit,'},
                            createdAt: createdAt, lastUpdated: lastUpdated, registration: registration} as Car)
      .subscribe(c => {
        this.cars.push(c);
      });
  }

  deleteCar(car: Car): void {
    this.carService.deleteCar(car.id).subscribe();
    this.cars = this.cars.filter(c => c !== car);
  }

}
