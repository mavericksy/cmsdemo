import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //
  constructor(
        private authService: AuthService,
        private router: Router,
    ) {}
  //
  ngOnInit(): void {
    if(!this.authService.isAuthenticatedUser()){
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/cms']);
    }
  }
}
