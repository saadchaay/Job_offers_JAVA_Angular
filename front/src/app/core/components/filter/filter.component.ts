import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Profile} from "../../models/profile";
import {ProfileService} from "../../services/profile.service";
import {HttpErrorResponse} from "@angular/common/http";
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../models/offer";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  profileSelected: any;
  locationSelected: any;
  searchTitle: any;
  profiles!: Profile[]
  @Output() filterClick = new EventEmitter<object>();

  constructor(private profileService: ProfileService, private offerService: OfferService) {}

  ngOnInit() {
      this.fetchProfiles();
  }

  fetchProfiles() {
    this.profileService.getAllProfiles().subscribe(
      (res: Profile[]) => {
        this.profiles = res;
      }, (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    )
  }

  filterData(){
    this.filterClick.emit({profile: this.profileSelected,
      location: this.locationSelected, title: this.searchTitle})
  }

}
