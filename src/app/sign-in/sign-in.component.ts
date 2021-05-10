import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {User} from '../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  userEmail: any = '';
  password: any = '';
  confirmPassword: any = '';
  emailDoesNotExists = false;
  validEmail = false;
  passwordMatch = true;
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllUsers();
  }

  checkUser(): void {
    if (this.userEmail !== '' && this.dataService.emailValidator(this.userEmail)) {
      this.validEmail = false;
      this.emailDoesNotExists = !this.dataService.checkUser(this.userEmail);
    } else if (this.userEmail === '' || this.userEmail === undefined || this.userEmail == null) {
      this.validEmail = false;
    } else {
      this.validEmail = true;
      this.emailDoesNotExists = false;
    }
  }

  checkPassword(): void {
    this.passwordMatch = this.password.localeCompare(this.confirmPassword);
  }

  addUser(): void {
    const user = new User();
    user.userEmail = this.userEmail;
    user.password = this.password;
    user.loggedIn = false;
    this.userEmail = '';
    this.password = '';
    this.confirmPassword = '';
    this.dataService.usersList.push(user);
    sessionStorage.setItem('usersList', JSON.stringify(this.dataService.usersList));
    window.location.href = 'http://localhost:4200/login';
  }
}
