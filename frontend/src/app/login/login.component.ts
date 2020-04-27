import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.auth.loginUser(this.loginForm.value)
    .subscribe(
      res => {
        localStorage.setItem('token', res.headers.get('x-auth-token'));
        this.router.navigate(['/events']);
      },
      err => console.log(err)
    );
  }

}
