//
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
//
export class LoginComponent {
  loginForm?: any;

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      //
      this.authService.login(username, password).subscribe({
        next: () => {
          window.location.href = '/';
        },
        error: () => {
          window.alert('Oopsie... Try login again.');
          this.router.navigate(['/login']);
        }
      });
    }
  }
};
