import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Offer} from "../../models/offer";
import {Profile} from "../../models/profile";
import {ProfileService} from "../../services/profile.service";
import {HttpErrorResponse} from "@angular/common/http";
import {OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit{
  model = false;
  loader = false;
  profiles!: Profile[]
  @Input() companyId!: number
  @Output() closeClicked = new EventEmitter<void>();
  @Output() submitOffer = new EventEmitter<void>();

  constructor(private profileService: ProfileService, private offerService: OfferService) {}

  ngOnInit() {
    this.fetchAllProfiles();
  }

  addOffer(offer: NgForm){
    console.log("hello:  " + offer.value);
  }

  closeModalChild(offer: NgForm){
    offer.reset();
    this.closeClicked.emit();
  }

  fetchAllProfiles() {
    this.profileService.getAllProfiles().subscribe(
      (res: Profile[]) => {
        this.profiles = res;
      }, (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  addJobOffer(jobOffer: NgForm){
    console.log(this.companyId)
    console.log(jobOffer.value)
    this.offerService.addJobOffer(jobOffer.value, this.companyId).subscribe(
      (res: string) => {
        console.log(res)
        jobOffer.reset()
        this.submitOffer.emit()
        this.closeClicked.emit()
      }, (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }


}
