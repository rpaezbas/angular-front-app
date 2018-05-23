import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../car';
import { Observable, Timestamp, Subscription } from 'rxjs';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, OnDestroy {

  carsSubcription: Subscription;
  cars: Car[];
  newDate: Date = new Date();


  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carsSubcription = this.carService.subject.subscribe((cars) => this.cars = cars);
    this.carService.getEntitiesInDB();
  }
  ngOnDestroy() {
    this.carsSubcription.unsubscribe();
  }

  deleteCar(car: Car): void {
    this.carService.deleteEntityInDB(car.id);
  }

}
