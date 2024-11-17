
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginComponent {
  hide = signal(true);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  errorMessage = signal('');

  constructor(private router: Router, private http: HttpClient) {
    merge(this.loginForm.get('email')!.statusChanges, this.loginForm.get('email')!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.loginForm.get('email')?.hasError('email')) {
      this.errorMessage.set('Correo no válido');
    } else {
      this.errorMessage.set('');
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage.set('Por favor, completa todos los campos correctamente.');
      window.alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    // Realizar la solicitud HTTP para obtener los usuarios
    this.http.get<any[]>('https://api.escuelajs.co/api/v1/users').subscribe(
      (usuarios) => {
        // Buscar si existe un usuario con el correo y contraseña ingresados
        const usuarioValido = usuarios.find(
          (usuario) => usuario.email === email && usuario.password === password
        );

        if (usuarioValido) {
          // Login exitoso
          console.log('Inicion de Sesión exitoso');
          window.alert('Bienvenido, ' + usuarioValido.name);
          this.router.navigate(['/sidebar']);
        } else {
          // Login fallido
          this.errorMessage.set('Correo o contraseña incorrectos.');
          window.alert('Correo o contraseña incorrectos.');
        }
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
        this.errorMessage.set('Hubo un problema al iniciar sesión. Por favor, intenta más tarde.');
        window.alert('Hubo un problema al iniciar sesión. Por favor, intenta más tarde.');
      }
    );
  }
}

