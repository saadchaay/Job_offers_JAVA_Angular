import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private authService: AuthenticationService, private router: Router) {}

  login(credentials: NgForm){
    console.log(credentials.value);

    this.authService.agentAuth(credentials.value).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.clear();
        localStorage.setItem("auth", JSON.stringify(res));
        this.router.navigate(['admin/dashboard']);
      }, (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    )
  }
}
