import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  alertVisible: boolean;
  alertMessage: string;

  user: User = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    tel: 0,
    dni: 0,
    dateBirth: '',
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.alertVisible = false;
    this.alertMessage = '';
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      check: new FormControl(false, Validators.requiredTrue),
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get tel() {
    return this.registerForm.get('tel');
  }

  get dni() {
    return this.registerForm.get('dni');
  }

  get dateName() {
    return this.registerForm.get('dateName');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password2() {
    return this.registerForm.get('password2');
  }

  get check() {
    return this.registerForm.get('check');
  }

  onSubmit(): void {
    if (
      this.password !== null &&
      this.password2 !== null &&
      this.registerForm.valid &&
      this.password.value === this.password2.value &&
      this.name !== null &&
      this.lastname !== null &&
      this.username !== null &&
      this.email !== null
    ) {
      const user = {
        id: 0, // por el momento necesitamos setear el id manualmente
        first_name: this.name.value!,
        last_name: this.lastname.value!,
        email: this.email.value!,
        username: this.username.value!,
        password: this.password.value!,
        tel: this.tel?.value!,
        dateBirth: this.dateName?.value!,
        dni: this.dni?.value!,
      };

      this.userService.create(user).subscribe(
        () => {
          if (user) {
            // Registro exitoso
            console.log('Registro exitoso');
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          // Error al crear el usuario
          console.error('Error al crear el usuario:', error);
          this.showAlert(
            'Error al registrar el usuario. Por favor, intenta nuevamente.'
          );
        }
      );

      this.hideAlert();
    } else {
      this.showAlert('Por favor, revisa el formulario.');

      if (this.name !== null) {
        this.name.markAsDirty();
        this.name.markAsTouched();
      }

      if (this.lastname !== null) {
        this.lastname.markAsDirty();
        this.lastname.markAsTouched();
      }

      if (this.email !== null) {
        this.email.markAsDirty();
        this.email.markAsTouched();
      }

      if (this.username !== null) {
        this.username.markAsDirty();
        this.username.markAsTouched();
      }

      if (this.password !== null) {
        this.password.markAsDirty();
        this.password.markAsTouched();
      }

      if (this.password2 !== null) {
        this.password2.markAsDirty();
        this.password2.markAsTouched();
      }

      if (this.check !== null) {
        this.check.markAsDirty();
        this.check.markAsTouched();
      }
    }
  }

  showAlert(message: string): void {
    let errorMessage = message;

    if (this.name?.invalid) {
      errorMessage += '<br/>- Nombre inválido.';
    }

    if (this.lastname?.invalid) {
      errorMessage += '<br/>- Apellido inválido.';
    }

    if (this.username?.invalid) {
      errorMessage += '<br/>- Nombre de usuario inválido.';
    }

    if (this.email?.invalid) {
      errorMessage += '<br/>- Correo electrónico inválido.';
    }

    if (this.password?.invalid) {
      errorMessage += '<br/>- Contraseña inválida.';
    }

    if (this.password2?.invalid) {
      errorMessage += '<br/>- Contraseña inválida.';
    }

    if (this.password?.value !== this.password2?.value) {
      errorMessage += '<br/>- Las contraseñas no coinciden.';
    }

    if (this.check?.invalid) {
      errorMessage += '<br/>- Debes aceptar los términos y condiciones.';
    }

    this.alertMessage = errorMessage;
    this.alertVisible = true;
    setTimeout(() => this.hideAlert(), 3900);
  }

  hideAlert(): void {
    this.alertVisible = false;
    this.alertMessage = '';
  }
}
