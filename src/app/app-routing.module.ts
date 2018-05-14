import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { NewCarComponent } from './new-car/new-car.component';


const routes: Routes = [
  { path: '', component: CarsComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'carDetails/:id', component: CarDetailsComponent },
  { path: 'newCar', component: NewCarComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
