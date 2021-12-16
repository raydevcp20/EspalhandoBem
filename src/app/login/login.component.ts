import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signUpButton: any = "";
  signInButton: any = "";
  container: any = "";

  passwordEquals: boolean = true;

  newUser: any = {};

  categoriesList: any = [];

  email: string="";
  password: string="";

  constructor(
    private userService: UserService,
    private router: Router,
    private categoryService: CategoryService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    // this.cookieService.set('logged', 'false');
    this.container = document.getElementById('container');

    this.categoryService.listAllCategories().subscribe(
      (data)=>{
        this.categoriesList = data;
      });

    this.newUser.typeNID = 'cpf';
  }

  choiceOn(typeID: string){
    this.newUser.typeNID = typeID;
  }

  choiceCategory(idCategory: string){
    this.newUser.idCategory = idCategory;
  }

  createUser(): void {
    if(this.newUser.typeNID == 'cpf'){
      let result = this.validadorCPF(this.newUser.cpf);
      if(!result){
        return;
      }
    }else{
      let result = this.validarCNPJ(this.newUser.cnpj);
      if(!result){
        return;
      }
    }
    
    this.userService.createUser(this.newUser).subscribe((msg:string) => {
      console.log(msg);
      this.router.navigate(["login"]);
    });
  }

  checkPassword($event: any): void {
    let password = $event.target.value;

    if(password == this.newUser.password){
      this.passwordEquals = true;
    }else{
      this.passwordEquals = false;
    }
  }

  login(): void {
    this.userService
      .login(this.email, this.password)
      .subscribe();
  }

  logout(): void {
    localStorage.removeItem("token");
    this.userService.isUserLoggedIn = false;
    // this.router.navigate(["login"]);
  }

  signIn(){
    this.container.classList.remove("right-panel-active");
  }

  signUp(){
    this.container.classList.add("right-panel-active");
  }

  validadorCPF(strCPFe: any){
    var strCPF = strCPFe.target.value;
    let Soma;
    let Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
      return true;
  }

  validarCNPJ(cnpje :any) {
    var cnpj = cnpje.target.value;

    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
  }
}
