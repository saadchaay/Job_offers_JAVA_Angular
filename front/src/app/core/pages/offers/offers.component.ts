import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Offer} from "../../models/offer";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit{
  loader = false;
  offers!: Offer[];
  offersFiltered!: Offer[];
  viewOffer!: Offer;

  constructor(private offerService: OfferService) {}

  ngOnInit() {
    this.fetchAllOffers();
  }

  fetchAllOffers() {
    this.offerService.getAcceptedOffers().subscribe(
      (res: Offer[]) => {
        this.offers = res;
        this.viewOffer = res[0];
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  viewOfferDetails(offerId: number){
    this.loader = true;
    this.offerService.getOfferById(offerId).subscribe(
      (res: Offer) => {
        this.viewOffer = res;
        this.loader = false;
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  filterOfferData(offerSearch: object){
    // this.ngOnInit();
    let offersFiltered = this.offers;
    // @ts-ignore
    let profile = offerSearch.profile;
    // @ts-ignore
    let location = offerSearch.location;
    // @ts-ignore
    let title = offerSearch.title;
    if(title != undefined){
      offersFiltered = offersFiltered.filter(item => (item.title).toLowerCase().includes(title.toLowerCase()));
      // this.offers = offersFiltered;
    }
    if(profile != undefined){
      offersFiltered = offersFiltered.filter(item => (item.profileId == profile));
      // this.offers = offersFiltered;
    }
    if(location != undefined){
      offersFiltered = offersFiltered.filter(item => (item.location).toLowerCase().includes(location.toLowerCase()));
      // this.offers = offersFiltered;
    }
    this.offersFiltered = offersFiltered;
  }
}
