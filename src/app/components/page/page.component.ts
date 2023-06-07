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
  valueSearchO:string = "";
  countH:number = 0;
  countV:number = 0;
  countO:number = 0;
  match:number = 0;
  isValidate:boolean = false;
  isMutantDna:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  isMutant(x:string[]):boolean{

    this.isValidate = false;
    this.match = 0;

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
              this.match++;
              this.countH = 0;
            }

            this.valueSearchH = element[j];
            /************ FIN VALIDACIÓN BUSQUEDA HORIZONTAL ************/

            /************ VALIDACIÓN PARA BUSQUEDA VERTICAL ************/
            if(this.valueSearchV == cadena[j][i]){
              this.countV++;
            }
            else{
              this.countV = 0;
            }

            if(this.countV > 2){
              console.log(`-->Vertical Tienes una coincidencia que finaliza en la cadena ${cadena[j]} con el caracter ${cadena[j][i]} en la posición ${i}`);
              this.match++;
              this.countV = 0;
            }

            this.valueSearchV = cadena[j][i];
            /************ FIN VALIDACIÓN BUSQUEDA VERTICAL ************/

            /************ VALIDACIÓN PARA BUSQUEDA OBLICUA ************/
            this.valueSearchO = cadena[i][j];
            
            if(this.countO > 2){
              console.log(`-->Oblicua Tienes una coincidencia que empieza en la cadena ${cadena[i]} con el caracter ${cadena[i][j]} en la posición ${j}`);
              this.match++;
              this.countO = 0;
            }
            if(i <= cadena.length - 4 && j <= cadena[i].length - 4 ){

              for (let y = 1; y <= 3; y++) {

                if(this.valueSearchO == cadena[i+y][j+y]){
                  this.countO++;
                }
                else{
                  this.countO = 0;
                }
              }
            }
            /************ FIN VALIDACIÓN BUSQUEDA OBLICUA ************/

          }
          else{
              console.log(element[j]," No es un valor permitido");
              
              this.isMutantDna = false
              return this.isMutantDna;
            }
            
          }
        }
      console.log(`Coincidencias ${this.match}`);
      if(this.match > 1){
        this.isMutantDna = true
        return this.isMutantDna;
      }
    }
    this.isMutantDna = false
    return this.isMutantDna;
  }
}
