import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../car';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  form: FormGroup;

  constructor(private carService: CarService) { }

  ngOnInit() {
     this.form = new FormGroup({
      brand: new FormControl('brand', Validators.required),
      country: new FormControl('country', Validators.required),
      createdAt: new FormControl('createdAt', [Validators.minLength(19), Validators.required]),
      registration: new FormControl('registration', [Validators.minLength(19), Validators.required]),
      lastUpdated: new FormControl('lastUpdated', [Validators.minLength(19), Validators.required])
    });
  }

  add(country: string, createdAt: Date, registration: Date, lastUpdated: Date): void {
    if (country !== '' && createdAt !== null && registration != null && lastUpdated != null) {
      this.carService.addEntityInDB({
        country: country, brand: { id: 5, name: 'iscing elit,' },
        createdAt: createdAt, lastUpdated: lastUpdated, registration: registration
      } as Car);
    }
  }
}
