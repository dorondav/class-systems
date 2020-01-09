import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../authService.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthData } from '../auth-data.modoe';

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
  private authData: AuthData;
  private userId: string;

  constructor(private authService: AuthService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {

        this.mode = 'edit-user';
        this.userId = paramMap.get('userId');
        this.authService.getAuthUserById(this.userId)
          .subscribe((authUserData: any) => {
            this.isLoading = false;
            this.authData = {
              name: authUserData.name,
              email: authUserData.email,
              password: authUserData.password,
              permission: authUserData.permission,
              phone: authUserData.phone
            };
            this.authForm.setValue({
              name: this.authData.name,
              password: null,
              permission: this.authData.permission,
              email: this.authData.email,
              phone: this.authData.phone
            });
          });
        this.isLoading = false;
      } else {
        this.mode = 'registresion';
        this.userId = null;
        this.isLoading = false;
      }
    });
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

    if (this.authForm.invalid) {
      return;
    }
    if (this.mode === 'registresion') {
      this.authService.createUser(this.authForm.value);
      this.isLoading = true;
    } else {
      this.authService.updateUserData(this.authForm.value, this.userId);
    }
    this.authForm.reset();
  }
}
