import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from '../services/carrito.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: Router,
    public carritoService: CarritoService
  ) {}

  ngOnInit(): void {}
  /*
  get logIn(): boolean {
    return this.authService.isLoggedIn;
  }
*/
  get user(): User | undefined {
    return this.authService.getUser();
  }
  logout() {
    console.log('click');
    this.authService.logout();
    this.route.navigate(['/auth/login']);
  }
}
