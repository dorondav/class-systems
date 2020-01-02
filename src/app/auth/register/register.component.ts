import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../authService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  authForm: FormGroup;
  isLoading = false;
  mode = 'registresion';
  roles = ['Admin', 'Shop', 'User', 'Guest'];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.initForm();

  }
  initForm() {
    this.authForm = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
      permission: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      phone: new FormControl(null, { validators: [Validators.required] })
    });
    this.isLoading = false;

  }

  onUserSave() {
    this.authService.createUser(this.authForm.value);

  }
}
