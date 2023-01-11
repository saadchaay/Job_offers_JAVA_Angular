import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Offer} from "../models/offer";
import * as http from "http";
import {environment} from "../../../env/environment";
import {AuthCredentials} from "../models/auth-credentials";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  public getAllOffers(token: string): Observable<Offer[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers);
    return this.http.get<Offer[]>(`${this.apiUrl}/offers-all`, {headers});
  }

  public getAcceptedOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers`);
  }

  public getCompanyOffers(companyId: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers/company/${companyId}`);
  }

  // add token here ......
  public addJobOffer(offer: Offer, companyId: number): Observable<string> {
    offer.companyId = companyId;
    // @ts-ignore
    return this.http.post<string>(`${this.apiUrl}/offers-save`, offer, {responseType: "text"});
  }

  public getOfferById(offerId: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}/offers/${offerId}`);
  }

}
