import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Offer} from "../models/offer";
import * as http from "http";
import {environment} from "../../../env/environment";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  public getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers`);
  }

  public getCompanyOffers(companyId: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers/company/${companyId}`);
  }

  public addJobOffer(offer: Offer, companyId: number): Observable<string> {
    offer.companyId = companyId;
    // @ts-ignore
    return this.http.post<string>(`${this.apiUrl}/offers/save`, offer, {responseType: "text"});
  }

}
