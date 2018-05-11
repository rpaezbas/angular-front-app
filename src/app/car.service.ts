import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Car } from './car';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  // tslint:disable-next-line:max-line-length
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJodHRwczovL3JwLmNvbS91c2VyX21ldGFkYXRhIjp7InJvbCI6ImFkbWluIn0sIm5pY2tuYW1lIjoicnBhZXpiYXMiLCJuYW1lIjoicnBhZXpiYXNAZXZlcmlzLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8wMTZhNzA2NWIxZjZmMjcxNGVkNTVmNzBjZDg0NDFiYz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnJwLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE4LTA1LTA5VDExOjE3OjQ3LjI0OFoiLCJpc3MiOiJodHRwczovL3JwYWV6YmFzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YWNiOTM0NTQzYzg3ZjExNDllZmRiMWMiLCJhdWQiOiJ4Nm1FcTF4cVdrcjczMEVLTUQ0M043Z1kyMjdDWm1wZSIsImlhdCI6MTUyNTg2NDY2OSwiZXhwIjoxNTI2ODY0NjY5fQ.HO0ftrTTijPo3yDyoCaOvoNxArx2U0zyquFFpUeveBo' })
};

@Injectable({
  providedIn: 'root'
})

export class CarService {

  private carsURL = 'http://localhost:8080/Login/api/cars/';

  constructor(
    private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsURL, httpOptions);
  }

  getCar(id: number): Observable<Car> {
    const url = `${this.carsURL}/${id}`;
    return this.http.get<Car>(url, httpOptions).pipe(
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }

  updateCar(id: number, car: Car): Observable<Car> {
    const url = `${this.carsURL}/${id}`;
    return this.http.put<Car>(url, car, httpOptions).pipe(
      catchError(this.handleError<any>('updateCar'))
    );
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsURL, car, httpOptions).pipe(
      catchError(this.handleError<any>('addCar'))
    );
  }

  deleteCar(id: number): Observable<Car> {
    const url = `${this.carsURL}/${id}`;
    return this.http.delete<Car>(url, httpOptions).pipe(
      catchError(this.handleError<Car>('deleteCar'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
