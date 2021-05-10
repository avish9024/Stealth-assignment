import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userEmail: any = '';
  password: any = '';
  emailDoesNotExists = false;
  passwordMatch = true;
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllUsers();
    console.log(this.dataService.usersList);
  }

  checkUser(): void {
    this.emailDoesNotExists = this.dataService.checkUser(this.userEmail);
  }

  login(): void {
    this.passwordMatch = !this.dataService.checkCredential(this.userEmail, this.password);
    if (this.passwordMatch) {
      this.dataService.usersList.find(a => a.userEmail === this.userEmail).loggedIn = true;
      this.dataService.loggedInUser = this.dataService.usersList.find(a => a.userEmail === this.userEmail);
      localStorage.setItem('usersList', JSON.stringify(this.dataService.usersList));
      localStorage.setItem('loggedInUser', JSON.stringify(this.dataService.loggedInUser));
      window.location.href = 'http://localhost:4200/dashboard';
    }
  }

}
