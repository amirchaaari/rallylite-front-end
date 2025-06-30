import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.error = null;
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.http.post<{ access_token: string }>('http://localhost:3000/auth/login', this.loginForm.value)
    .subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token); // ✅ match backend key
        this.router.navigate(['/matches']);
      },
      error: (err) => {
        this.error ='Login failed. Please try again.';
        this.loading = true;
      },
      complete: () => this.loading = false
    });
  
  }
}
