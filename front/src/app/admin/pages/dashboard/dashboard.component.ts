import {Component, OnInit} from '@angular/core';
import {OfferService} from "../../../core/services/offer.service";
import {Offer} from "../../../core/models/offer";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthCredentials} from "../../../core/models/auth-credentials";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  offers!: Offer[]
  countOffers: number[] = [0, 0, 0];
  auth!: AuthCredentials
  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.fetchAllOffers();
  }

  fetchAllOffers(){
    let pendingCount = 0;
    let acceptedCount = 0;
    // @ts-ignore
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.offerService.getAllOffers(this.auth.token).subscribe(
      (res: Offer[]) => {
        this.offers = res;
        res.forEach(({status}) => {
          if(status == "Pending") {
            pendingCount++;
          }
          if(status == "Accepted") {
            acceptedCount++;
          }
        });
        console.log(pendingCount);
        console.log(acceptedCount);
        console.log(res.length);
        this.countOffers[0]= res.length;
        this.countOffers[1] = pendingCount;
        this.countOffers[2] = acceptedCount;
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

}
