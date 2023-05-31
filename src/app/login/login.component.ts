import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signUpButton: any = '';
  signInButton: any = '';
  container: any = '';

  userForm = new FormGroup({
    typeNID: new FormControl(''),
    name: new FormControl('', Validators.required),
    email: new FormControl(''),
    cpf: new FormControl(''),
    cnpj: new FormControl(''),
    phone: new FormControl(''),
    cep: new FormControl(''),
    city: new FormControl({value: '', disabled: true}),
    street: new FormControl({value: '', disabled: true}),
    state: new FormControl({value: '', disabled: true}),
    idCategory: new FormControl(''),
    password: new FormControl(''),
  });

  passwordEquals: boolean = true;

  newUser: any = {
    typeNID: '',
    name: '',
    email: '',
    cpf: '',
    cnpj: '',
    phone: '',
    street: '',
    cep: '',
    city: '',
    state: '',
    idCategory: 0,
    password: '',
  };

  categoriesList: any = [];

  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // this.cookieService.set('logged', 'false');
    this.container = document.getElementById('container');

    this.categoryService.listAllCategories().subscribe((data) => {
      this.categoriesList = data;
    });

    this.newUser.typeNID = 'cpf';
  }

  choiceOn(typeID: string) {
    this.newUser.typeNID = typeID;
  }

  choiceCategory(idCategory: string) {
    this.newUser.idCategory = idCategory;
  }

  createUser(): void {
    console.log(this.userForm.value);
    // if(this.newUser.typeNID == 'cpf'){
    //   let result = this.validateCPF(this.newUser.cpf);
    //   if(!result){
    //     debugger;
    //     this.toastr.error('Error: ', 'CPF não validado');
    //     return;
    //   }
    // }else{
    //   let result = this.validarCNPJ(this.newUser.cnpj);
    //   if(!result){
    //     this.toastr.error('Error: ', 'CNPJ não validado');
    //     return;
    //   }
    // }

    // this.userService.createUser(this.newUser).subscribe((msg: any) => {
    //   console.log(msg);
    //   this.toastr.success('Criação de usuário bem sucedida ', msg.message);
    //   // this.router.navigate(["login"]);
    //   window.location.reload();
    // });
  }

  checkPassword($event: any): void {
    let password = $event.target.value;

    if (password == this.newUser.password) {
      this.passwordEquals = true;
    } else {
      this.passwordEquals = false;
    }
  }

  login(): void {
    this.userService.login(this.email, this.password).subscribe();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userService.isUserLoggedIn = false;
    // this.router.navigate(["login"]);
  }

  signIn() {
    this.container.classList.remove('right-panel-active');
  }

  signUp() {
    this.container.classList.add('right-panel-active');
  }

  validateCPF() {
    let cpf = this.userForm.value.cpf || '';
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    let rest;

    for (var i = 1; i <= 9; i++) {
      sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    rest = 0;

    for (var i = 1; i <= 10; i++) {
      sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;

    if (rest !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  validateCNPJ() {
    let cnpj = this.userForm.value.cnpj || '';
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    let sum = 0;
    let weight = 2;
    for (var i = 11; i >= 0; i--) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }

    let digitoVerificador = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (digitoVerificador !== parseInt(cnpj.charAt(12))) {
      return false;
    }

    sum = 0;
    weight = 2;

    for (var i = 12; i >= 0; i--) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }

    digitoVerificador = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (digitoVerificador !== parseInt(cnpj.charAt(13))) {
      return false;
    }

    return true;
  }

  validateEmail() {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.userForm.value.email || '');
  }

  validateCEP() {
    let cep = this.userForm.value.cep || '';
    cep = cep.replace(/\D/g, '');
    if(cep.length > 7){
      return true;
    }

    return false;
  }

  getAddressByViaCep() {
    if (this.validateCEP()) {
      this.userService.getAddressByViaCep(this.userForm.value.cep || '')
      .subscribe((address: any) => {
        console.log(address)
        this.userForm.value.city = address.localidade;
        this.userForm.value.street = address.logradouro;
        this.userForm.value.state = address.uf;
        this.userForm.setValue(this.userForm.value as any);
        // console.log(this.userForm.setValue(this.userForm.value)
      });
    }
  }
}
