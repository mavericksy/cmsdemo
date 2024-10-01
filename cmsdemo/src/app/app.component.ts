//
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AppItems } from './items/items.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
//
export class AppComponent {
  title = 'CMSDemo';
  //
  constructor(
    public authService: AuthService,
  ) {}

  logout(): void {
    this.authService.logout();
    window.location.href = '/';
  }
}
