import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;

    this.initForm();

  }

  initForm() {
    this.loginForm = new FormGroup({
      loginPassword: new FormControl(null, { validators: [Validators.required] }),
      loginEmail: new FormControl(null, { validators: [Validators.required] })
    });
    this.isLoading = false;

  }
  onLogin() {
  }
}
