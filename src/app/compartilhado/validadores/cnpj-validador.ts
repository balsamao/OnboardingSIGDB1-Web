import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export function cnpjValidador(control: AbstractControl): { [key: string]: any } | null {
    let numero: string = '';
    if (control.value !== undefined && control.value !== null) {
        for (let posicao = 0; posicao < control.value.length; posicao++) {
            if (posicao == 0) {
                numero = control.value[posicao];
            }
            if (control.value == numero.repeat(control.value.length)) {
                console.log(numero.repeat(control.value.length));
                return { 'cnpjValidador': true };
            }
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