import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotFormGroup: any
  resetPasswordFormGroup: any;
  forgotPassImg = 'assets/forget-password/forget-password.svg';
  isVerified = true;
  submitted: any;
  token: any;
  showResetPasswordPage = false;
  constructor(public sanitizer: DomSanitizer, private fb: FormBuilder, private http: HttpService, private route: ActivatedRoute,
    private router : Router) {
    this.token = this.route.snapshot.queryParams['token'];
    this.http.verifyResetPasswordToken(this.token).subscribe((res: any) => {
      if (res.status == 1) {
        this.showResetPasswordPage = true;
      }
    });
  }

  ngOnInit(): void {

    this.sanitizer.bypassSecurityTrustResourceUrl('assets/illustators/forgotpassword.svg');
    this.forgotFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
    this.resetPasswordFormGroup = this.fb.group({
      newPass: ['', [Validators.required]],
      confirmNewPass: ['', Validators.required]
    })
  }

  get password() {
    return this.resetPasswordFormGroup.get('newPass');
  }

  get confirmpassword() {
    return this.resetPasswordFormGroup.get('confirmNewPass');
  }


  onPasswordValidation(){
    if (this.password.value.match(/\b(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}\b/)) {
      this.resetPasswordFormGroup.get('confirmNewPass').enable();
    }
    else {
      this.resetPasswordFormGroup.get('confirmNewPass').disable();
    }
  }

  onPasswordChange() {
    if (this.confirmpassword.value == this.password.value) {
      this.confirmpassword.setErrors(null);
    } else {
      this.confirmpassword.setErrors({ mismatch: true });
    }
  }

  submit() {
    // this.isVerified = false;
    this.submitted = true;
    const data = {
      email: this.forgotFormGroup.controls.email.value
    }
    this.http.forgotPassword(data).subscribe((res: any) => {
      if (res.status == 1) {
        this.isVerified = true;
      }
      if(res.message == 'Email not registered'){
        this.isVerified = true;
        Swal.fire({
          title: "Email has not been registered yet!",
          imageUrl: 'assets/illustators/SomethingWentWrong.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Email not registered',
        })
      }
      if(res.message == 'Reset password link sent to your email!'){
        this.isVerified = true;
        Swal.fire({
          title: "Reset password link sent to your email!",
          // imageUrl: 'assets/illustators/SomethingWentWrong.svg',
          // imageWidth: 400,
          // imageHeight: 200,
          imageAlt: 'Email not registered',
        })
      }
    });
  }

  submitNewPassword(){
    const data = {
      newPassword: this.resetPasswordFormGroup.controls.confirmNewPass.value,
      token: this.token
    }
    this.http.resetPassword(data).subscribe((res: any) => {
      if(res.status == 1){
        this.router.navigate(['auth/login']);
      }
    })
  }
}
