import {
  Component,
  OnInit
} from '@angular/core';
import * as $ from 'jquery';
import axios from 'axios';
import {
  UserService, PaymentService
} from './../../_services/index';
import {
  SessionService
} from './../../_core/index';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-husband',
  templateUrl: './husband.component.html',
  styleUrls: ['./husband.component.css']
})
export class HusbandComponent implements OnInit {

  constructor(private _UserService: UserService, private _SessionService: SessionService, private _router: Router,
    private _PaymentService: PaymentService) {}

  ngOnInit() {


    $(document).ready(function () {


      $("#show2").click(function () {
        $("#panel").fadeOut(1000);
        $("#show2").fadeOut();
        $("#flip").fadeIn(9000);

      });
      $("#flip").click(function () {
        $("#flip").fadeOut();
        $("#panel").slideToggle(1500);
        $("#show2").slideToggle(3000);


      });
      $("#show3").click(function () {
        $("#panel1").slideToggle(1500);
        $("#show1").slideToggle(3000);
        $("#show3").fadeOut();

      });
      $("#show1").click(function () {
        $("#panel1").fadeOut(1000);
        $("#show1").fadeOut();
        $("#show3").fadeIn(9000);


      });


    });


    // document.getElementById('customButton').addEventListener('click', function(e) {
    //     e.preventDefault();
    //     let data = JSON.stringify({
    //         "idempotency_key": "13123g12hh13g2",
    //         "card_nonce": "fake-card-nonce-ok",
    //         "reference_id": "RPCE#12345 ",
    //         "note": "Miscellanious dog toys",
    //         "delay_capture": false,
    //         "shipping_address": {
    //             "address_line_1": "123 Main St",
    //             "locality": "San Francisco",
    //             "administrative_district_level_1": "CA",
    //             "postal_code": "94114",
    //             "country": "US"
    //         },
    //         "billing_address": {
    //             "address_line_1": "500 Electric Ave",
    //             "address_line_2": "Suite 600",
    //             "administrative_district_level_1": "NY",
    //             "locality": "New York",
    //             "postal_code": "10003",
    //             "country": "US"
    //         },
    //         "amount_money": {
    //             "amount": 5000,
    //             "currency": "USD"
    //         }
    //     });
    //     let access_token = JSON.stringify('sandbox-sq0atb-iA6OCpBYVAx6qIMgzeiphw');
    //     let location_id = 'CBASELGLAkFYiLCGR6VUt40QNwMgAQ';
    //     let url = 'https://connect.squareup.com/v2/locations/'+location_id+'/transactions';
    //     let token = 'Bearer '.concat(access_token);
    //     axios.post(url, data, {
    //         headers: {
    //             Accept: 'application/json',
    //             Authorization: token
    //         }})
    //         .then(response => {
                // this._UserService.addCourseToUser(this.courseName).subscribe(responseStatus => {
                //   this.payed = true;
                // }, error => {
                //   console.log('Error adding course to user');
                // });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //
    // });

    // check
    this.checkIfLoggedIn();

  }

  signedIn = false;
  payed = false;
  user: Object = {};
  courseName: string;

  checkIfLoggedIn() {
    this.signedIn = this._SessionService.isAuth();
    if(this.signedIn) {
      this.checkIfPayed();
    }
  }

  checkIfPayed() {
    this.courseName = this._router.url.substr(1).toLowerCase();
    this._UserService.checkIfPayedCourse(this.courseName).subscribe(payed => {
      if(payed.found == true) {
        this.payed = true;
      }
    }, error => {
      if(error.status == 403) {
        this._SessionService.destroy();
	      this.signedIn = false;
        // token expired
      } else {
        console.log('Error checking if user payed for course');
      }
    });
  }

  register() {
    this._UserService.register(this.user).subscribe(response => {
      // put user data in session
      this._SessionService.create(response);
      this.user = {};
      console.log('registered and logged in');
      this.signedIn = true;
    }, error => {
      console.log('Error registering user');
    });
  }

  login() {
    this._UserService.login(this.user['em'], this.user['pw']).subscribe(response => {
      this._SessionService.create(response);
      this.user = {};
      console.log('logged in');
      this.signedIn = true;
    }, error => {
      console.log('Error loggin in user');
    });
  }

  logout() {
    this._SessionService.destroy();
    this.signedIn = false;
    this.payed = false;
  }

  charge(cardNonce: string) {
    this._PaymentService.charge(cardNonce, 100).subscribe(data => {
      console.log('payment successfull, data is ', data);
      this._UserService.addCourseToUser(this.courseName).subscribe(updatedSessionObject => {
        this._SessionService.create(updatedSessionObject);
        this.payed = true;
      });
    }, error => {
      console.log('Error paying for course');
    });
  }
}