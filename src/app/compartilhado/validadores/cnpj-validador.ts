import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export function cnpjValidador(control: AbstractControl): { [key: string]: any } | null {
    let numero: string = '';
    if (control.value !== undefined && control.value !== null) {
        numero = control.value[0];
        if (control.value == numero?.repeat(control.value.length)) {
            return { 'cnpjValidador': true };
        }
    }
    return null;
}

@Directive({
    selector: '[cnpjValidadorDirective]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: AppCnpjValidadorDirective,
        multi: true
    }]
})
export class AppCnpjValidadorDirective implements Validator {

    validate(control: AbstractControl): { [key: string]: any } | null {
        return cnpjValidador(control);
    }
}