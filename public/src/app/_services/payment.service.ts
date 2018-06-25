import { Injectable } from '@angular/core';
import { HttpService, SessionService } from "../_core/index";
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpService, private _SesionService: SessionService) {}

  charge(card_nonce: string, amount: number) {
    return this.http.post(this.apiUrl + '/payment/user/' + this._SesionService.getUserId() + '/charge', {
      card_nonce: card_nonce,
      amount: amount
    }).map((res) => res.json());
  }

}