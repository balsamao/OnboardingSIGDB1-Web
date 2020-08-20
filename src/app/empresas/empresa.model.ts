export class Empresa{
    id: number = 0;
    name: string = '';
    cnpj: string = '';
    fundation: string = '';

    constructor(name : string, cnpj : string, fundation : string) {
        this.name = name;
        this.cnpj = cnpj;
        this.fundation = fundation;
    }
}