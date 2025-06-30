import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      sport: ['padel', Validators.required],
      level: ['intermediate', Validators.required],
      city: ['', Validators.required]
    });
  }

  onSubmit() {
    this.error = null;
    this.success = null;
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.http.post('http://localhost:3000/auth/register', this.registerForm.value)
      .subscribe({
        next: () => {
          this.success = 'Registration successful! You can now log in.';
          this.registerForm.reset({ sport: 'padel', level: 'intermediate' });
        },
        error: (err) => {
          this.error = err.error?.message || 'Registration failed. Please try again.';
          this.loading = false;
        },
        complete: () => this.loading = false
      });
  }
}
