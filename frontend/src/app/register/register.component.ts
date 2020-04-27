import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    fName: [''],
    lName: [''],
    email: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.auth.registerUser(this.registrationForm.value).subscribe(
      res => {
        localStorage.setItem('token', res.headers.get('x-auth-token'));
        this.router.navigate(['/events']);
      },
      err => console.log(err)
    );
  }


}
