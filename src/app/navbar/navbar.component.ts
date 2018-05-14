import { Component, OnInit } from '@angular/core';
import { NavbarItem } from '../navbar-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  brand: string;
  items: NavbarItem[];


  constructor() { }

  ngOnInit() {
    this.brand = 'My app!';
    this.items = [];
    this.items.push({ name: 'Create car', route: '/newCar' });
    console.log(this.items.length);

  }

}
