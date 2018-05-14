import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Car } from './car';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  // tslint:disable-next-line:max-line-length
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJodHRwczovL3JwLmNvbS91c2VyX21ldGFkYXRhIjp7InJvbCI6ImFkbWluIn0sIm5pY2tuYW1lIjoicnBhZXpiYXMiLCJuYW1lIjoicnBhZXpiYXNAZXZlcmlzLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8wMTZhNzA2NWIxZjZmMjcxNGVkNTVmNzBjZDg0NDFiYz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnJwLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE4LTA1LTA5VDExOjE3OjQ3LjI0OFoiLCJpc3MiOiJodHRwczovL3JwYWV6YmFzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YWNiOTM0NTQzYzg3ZjExNDllZmRiMWMiLCJhdWQiOiJ4Nm1FcTF4cVdrcjczMEVLTUQ0M043Z1kyMjdDWm1wZSIsImlhdCI6MTUyNTg2NDY2OSwiZXhwIjoxNTI2ODY0NjY5fQ.HO0ftrTTijPo3yDyoCaOvoNxArx2U0zyquFFpUeveBo' })
};

@Injectable({
  providedIn: 'root'
})

export class CarService {

  private carsURL = 'http://localhost:8080/Login/api/cars/';
  cars: Car[];
  carsSubject = new Subject<Car[]>();

  constructor(
    private http: HttpClient) { }

  // This method is called in the beginning to get the copy of the database.
  getCarsInDB(): void {
    this.http.get<Car[]>(this.carsURL, httpOptions).subscribe(cars => this.addCarsInMemory(cars));
  }

  // This method will be a callback after the http request, this way we keep a copy of the database in memory.
  // It updates the copy of the DB and passes the data to the subsciptors.
  addCarsInMemory(cars): void {
    this.cars = cars;
    this.carsSubject.next(this.cars);
  }

  // This method is only called to get the details of a single car, so it doesnt changes the database copy in memory.
  getSingleCarInDB(id: number): Observable<Car> {
    const url = `${this.carsURL}/${id}`;
    return this.http.get<Car>(url, httpOptions);
  }

  addCarInDB(car: Car): void {
    this.http.post<Car>(this.carsURL, car, httpOptions).subscribe(newCar => this.addSingleCarInMemory(newCar));
  }

  // Adds a new car to the database copy in memory and updates the data for the subscriptors.
  addSingleCarInMemory(car: Car): void {
    this.cars.push(car);
    this.carsSubject.next(this.cars);
  }

  updateCarInDB(id: number, car: Car): void {
    const url = `${this.carsURL}/${id}`;
    this.http.put<Car>(url, car, httpOptions).subscribe(updatedCar => {
      this.cars =  this.cars.filter(c => console.log(c));
      this.cars.push(updatedCar);
      this.carsSubject.next(this.cars);
    });
  }

  deleteCarInDB(id: number): void {
    const url = `${this.carsURL}/${id}`;
    this.http.delete<Car>(url, httpOptions).subscribe(() => {
      this.cars = this.cars.filter(c => c.id !== id);
      this.carsSubject.next(this.cars);
    });
  }

}
