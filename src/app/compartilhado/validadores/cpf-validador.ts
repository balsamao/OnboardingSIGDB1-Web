import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export function cpfValidador(control: AbstractControl): { [key: string]: any } | null {
    let numero: string = '';
    if (control.value !== undefined && control.value !== null) {
        numero = control.value[0];
        if (control.value == numero?.repeat(control.value.length)) {
            return { 'cpfValidador': true };
        }
    }
    return null;
}

@Directive({
    selector: '[cpfValidadorDirective]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: AppCpfValidadorDirective,
        multi: true
    }]
})
export class AppCpfValidadorDirective implements Validator {

    validate(control: AbstractControl): { [key: string]: any } | null {
        return cpfValidador(control);
    }
}