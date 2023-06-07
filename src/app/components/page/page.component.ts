import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  cadenaInicial:string[] = [];

  valueSearchH:string = "";
  valueSearchV:string = "";
  countH:number = 0;
  countV:number = 0;
  coincidencias:number = 0;
  isValidate:boolean = false;
  isMutantDna:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  isMutant(x:string[]):boolean{

    this.isValidate = false;
    this.coincidencias = 0;

    if(x.length > 0){
      this.isValidate = true;
      this.cadenaInicial = x;
      var cadena:string[] = [];

      cadena = x.toString().replace(/['"]+/g, '').split(',');
      console.log(cadena);

      for (let i = 0; i < cadena.length; i++) {
        
        const element = cadena[i];
        this.countH = 0;

        for (let j = 0; j < element.length; j++) {

          if(element[j] === "A" || element[j] === "T" ||element[j] === "C" || element[j] === "G"){
            /************ VALIDACIÓN PARA BUSQUEDA HORIZONTAL ************/
            if(this.valueSearchH == element[j]){
              this.countH++;
              
            }
            else{
              this.countH = 0;
            }

            if(this.countH > 2){
              console.log(`-->Horizontal Tienes una coincidencia en la cadena ${element} con el caracter ${element[j]}`);
              this.coincidencias++;
              this.countH = 0;
            }

            this.valueSearchH = element[j];
            /************ FIN VALIDACIÓN BUSQUEDA HORIZONTAL ************/

            /************ VALIDACIÓN PARA BUSQUEDA VERTICAL ************/
            if(this.valueSearchV == cadena[j][i]){
              //console.log(`Caracter ${cadena[j][i]}`);
              this.countV++;
            }
            else{
              this.countV = 0;
            }

            if(this.countV > 2){
              console.log(`-->Vertical Tienes una coincidencia que finaliza en la cadena ${cadena[j]} con el caracter ${cadena[j][i]} en la posición ${i}`);
              this.coincidencias++;
              this.countV = 0;
            }

            this.valueSearchV = cadena[j][i];
            /************ FIN VALIDACIÓN BUSQUEDA VERTICAL ************/

          }
          else{
              console.log(element[j]," No es un valor permitido");
              
              this.isMutantDna = false
              return this.isMutantDna;
            }
            
          }
        }
      console.log(`Coincidencias ${this.coincidencias}`);
      if(this.coincidencias > 1){
        this.isMutantDna = true
        return this.isMutantDna;
      }
    }
    this.isMutantDna = false
    return this.isMutantDna;
  }
}
