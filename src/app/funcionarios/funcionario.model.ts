export class Funcionario{
    id: number = 0;
    name: string = '';
    cpf: string = '';
    hiring: string = '';
    companyId : number | null = null;
    roleId : number | null = null;

    constructor(name : string, cpf : string, hiring : string) {
        this.name = name;
        this.cpf = cpf;
        this.hiring = hiring;
    }
}