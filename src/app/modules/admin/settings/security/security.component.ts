import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector       : 'settings-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsSecurityComponent implements OnInit
{
    securityForm: FormGroup;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    updating : boolean = false;
    currentPassword : string = '';
    newPassword : string = '';
    confirmPassword : string = '';

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
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
        this.alert.message = '';
        // Create the form
        this.securityForm = this._formBuilder.group({
            currentPassword  : [''],
            newPassword      : [''],
            confirmPassword      : [''],
            twoStep          : [true],
            askPasswordChange: [false]
        });
        this.securityForm.reset();
    }

    cancel(): void
    {
        this.securityForm.reset();
    }

    update(): void
    {

        // Se reinicia el mensaje de transacción.
        this.alert = {
            type: 'success',
            message: ''
        };

        // Se obtienen los datos de los campos.
        let newPass = this.securityForm.get('newPassword').value;
        let conPass = this.securityForm.get('confirmPassword').value;

        // Se valida que no estén vacíos
        if(newPass == '' || conPass == '') {
            this.alert = {
                type: 'error',
                message: 'Introduzca todos los campos'
            };
            return;
        }

        // Se valida que la nueva contraseña haya sido confirmada correctamente.
        if(newPass != conPass) {
            this.alert = {
                type: 'error',
                message: 'La contraseña no coincide'
            };
            return;
        }

        // Se valida la longitud de la contraseña.
        if(newPass.length < 5 || newPass.length > 15) {
            this.alert = {
                type: 'error',
                message: 'La contraseña debe ser de 5 a 15 caracteres'
            };
            return;
        }

        // Se valida que no contenga espacios en blanco.
        newPass.split('').forEach(element => {
            if(element == ' ') {
                this.alert = {
                    type: 'error',
                    message: 'La contraseña no puede tener espacios'
                };
                return;
            }
        });
        if(this.alert.message != '') {
            return;
        }

        // Se desabilitan los controles del formulario.
        this.updating = true;
        this.securityForm.disable();

        // Se envía la petición de cambio de password.
        this._authService.resetPassword(newPass)
            .pipe(
                finalize(() => {
                    this.securityForm.enable();
                    this.securityForm.reset();
                    this.updating = false;
                })
            )
            .subscribe(
                (response) => {
                    this.alert = {
                        type   : 'success',
                        message: 'Contraseña actualizada correctamente'
                    };
                },
                (response) => {
                    
                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: response.error.message
                    };
                }
            );
    }
}
