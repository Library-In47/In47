import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/orden.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User | null = null;
  orders: Order[] | null = null;

  constructor(private authService: AuthService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error obteniendo los datos del usuario', error);
      }
    );

    this.orderService.getAllOrdenes().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error obteniendo los datos de las ordenes', error);
      }
    );
  }
}