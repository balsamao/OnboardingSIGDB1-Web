import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alerta-sucesso',
  templateUrl: './alerta-sucesso.component.html',
  styleUrls: ['./alerta-sucesso.component.css']
})
export class AlertaSucessoComponent implements OnInit {

  @Input() podeExibir : boolean = false;
  @Input() mensagem: string = 'Registro salvo com sucesso!';

  constructor() { 
  }

  ngOnInit(): void {
  }

}
