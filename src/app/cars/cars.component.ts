import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../car';
import { Observable, Timestamp, Subscription } from 'rxjs';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  carsSubcription: Subscription;
  cars: Car[];
  newDate: Date = new Date();


  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carsSubcription = this.carService.carsSubject.subscribe(cars => this.cars = cars);
    this.carService.getCarsInDB();
  }

  deleteCar(car: Car): void {
    this.carService.deleteCarInDB(car.id);
  }

}
