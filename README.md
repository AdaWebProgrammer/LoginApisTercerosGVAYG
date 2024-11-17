# Login-Consumir Apis de Terceros

Este componente de login ha sido implementado utilizando Angular Material y conectando a una API externa para validar el inicio de sesión. A continuación, se explican las partes importantes del código y su funcionamiento.

## Descripción General

El componente de login (`LoginComponent`) es una implementación standalone de Angular que permite a los usuarios autenticarse utilizando un formulario. Este formulario captura el correo electrónico y la contraseña del usuario, los cuales luego son validados contra una API externa. El código se encuentra desarrollado utilizando Angular Material para los estilos del formulario y `HttpClient` para manejar las solicitudes HTTP.

## Estructura del Proyecto

- **Imports principales**: El componente importa varios módulos de Angular y Angular Material como `MatButtonModule`, `MatCardModule`, `HttpClientModule`, etc. También utiliza `ReactiveFormsModule` para manejar el formulario de login.
- **Formulario de Login**: Se define utilizando `FormGroup` y `FormControl`, con validaciones para los campos de correo y contraseña.
- **Conexión con la API**: El componente hace una solicitud HTTP a la API `https://api.escuelajs.co/api/v1/users` para validar las credenciales del usuario.

## Código Completo

```typescript
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
      this.errorMessage.set('Not a valid email');
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
          console.log('Login exitoso');
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
```
## Partes Importantes

### Conexión con la API

La conexión con la API se realiza utilizando `HttpClient` de Angular. Para que esto funcione, es importante importar `HttpClientModule` en el módulo o componente. En este caso, `HttpClientModule` se importa directamente en el componente independiente.

```typescript
import { HttpClientModule, HttpClient } from '@angular/common/http';
...
imports: [
  ...
  HttpClientModule
]```


------------



#### Validación de Login
El componente valida el formulario mediante el uso de FormGroupy FormControl. Además, el método onSubmit()verifica si las credenciales ingresadas coinciden con algún usuario de la API. Si el correo o la contraseña son incorrectos, se mostrará un mensaje de error.

```
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
      const usuarioValido = usuarios.find(
        (usuario) => usuario.email === email && usuario.password === password
      );

      if (usuarioValido) {
        console.log('Login exitoso');
        window.alert('Bienvenido, ' + usuarioValido.name);
        this.router.navigate(['/sidebar']);
      } else {
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
```

## Hecho por:
Guzmán Vite Adamaris Yareth Guadalupe

##Prueba
#Login
![image](https://github.com/user-attachments/assets/f27fa096-5f2c-4a8f-9343-cc9eab404334)

#Ingreso
![image](https://github.com/user-attachments/assets/8da49851-bce4-4807-9b20-f468ac6662a8)




###End
