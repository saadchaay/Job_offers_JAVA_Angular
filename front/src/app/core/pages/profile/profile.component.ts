import {Component, OnInit} from '@angular/core';
import {OfferService} from "../../services/offer.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Offer} from "../../models/offer";
import {AuthCredentials} from "../../models/auth-credentials";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  auth!: AuthCredentials;
  canDelete = true;
  modal = false;
  allOffers!: Offer[];
  loader = false;

  constructor(private offerService: OfferService, private router: Router) {}

  ngOnInit(): void {
    this.loader = true;
    if(localStorage.getItem("auth") == null){
      this.router.navigate(['sign-in']);
    }else{
      // @ts-ignore
      this.auth = JSON.parse(localStorage.getItem("auth"));
      this.fetchOfferByCompany();
      this.loader = false;
    }
  }

  openModal(){
    this.modal = true;
  }

  closeModal() {
    console.log("close");
    this.modal = false;
  }

  fetchOfferByCompany(){
    this.offerService.getCompanyOffers(this.auth.company.id).subscribe(
      (res: Offer[]) => {
        // console.log(res)
        this.allOffers = res;
      }, (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

}
