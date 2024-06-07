import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import Swal from 'sweetalert2'
import confetti from 'canvas-confetti';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    showContainer: boolean = true;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signUpForm = this._formBuilder.group({
                name      : ['', Validators.required],
                email     : ['', [Validators.required, Validators.email]],
                password  : ['', Validators.required],
                company   : [''],
                agreements: ['', Validators.requiredTrue]
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

       

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {
                    if(response.status == 'existe') {
                        this.signUpForm.get('email').setErrors({ emailExists: true });

                        // Swal.fire({
                        //     icon: 'warning',
                        //     title: 'Correo ya registrado',
                        //     text: 'El correo que ingresaste ya existe en el sistema. Por favor, usa otro correo.',
                        //     confirmButtonText: 'Aceptar',
                        //     allowOutsideClick: false,
                        // });
                    } else {
                        this.showContainer = false; // Ocultar el contenedor

                        let timerInterval;
                        Swal.fire({
                            icon: 'success',
                            title: "Te has registrado exitosamente!",
                            html: "En <b></b> segundos te redireccionaremos al inicio de sesión.",
                            timer: 5000,
                            timerProgressBar: true,
                            allowOutsideClick: false, // Evita que el modal se cierre al hacer clic fuera
                            didOpen: () => {
                                Swal.showLoading();
                                const timer = Swal.getPopup().querySelector("b");
                                timerInterval = setInterval(() => {
                                    timer.textContent = (Swal.getTimerLeft() / 1000).toFixed(0); // Convertir milisegundos a segundos
                                }, 100);

                                const canvas = document.createElement('canvas');
                                document.body.appendChild(canvas);
                                canvas.style.position = 'fixed';
                                canvas.style.top = '0';
                                canvas.style.left = '0';
                                canvas.style.width = '100%';
                                canvas.style.height = '100%';
                                canvas.style.pointerEvents = 'none'; // Para que no interfiera con los clics
                                canvas.style.zIndex = '9999'; // Asegura que el confetti tenga un z-index alto

                                const myConfetti = confetti.create(canvas, { resize: true });
                                myConfetti({
                                particleCount: 100,
                                spread: 70,
                                origin: { y: 0.6 }
                                });
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log("I was closed by the timer");
                                                        // Disable the form
                                this.signUpForm.disable();

                                // Hide the alert
                                this.showAlert = false;
                                // Redireccionar al inicio de sesión
                                this._router.navigateByUrl('/iniciar-sesion');
                            }
                        });
                    
                    }

                    
                    // Navigate to the confirmation required page
                    // this._router.navigateByUrl('/confirmation-required');
                },
                (response) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Something went wrong, please try again.'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
