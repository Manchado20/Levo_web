import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit
{
    accountForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder
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
        const payload = AuthUtils.getAccessTokenPayload(localStorage.accessToken);

        // Create the form
        this.accountForm = this._formBuilder.group({
            id      : ['M20320010'],
            name    : ['Invitado'],
            email   : [payload.email, Validators.email],
            career  : ['Ciencias Computacionales']
        });
    }
}
