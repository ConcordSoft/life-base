import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import axios from 'axios';


@Component({
  selector: 'app-husband',
  templateUrl: './husband.component.html',
  styleUrls: ['./husband.component.css']
})
export class HusbandComponent implements OnInit {

  constructor() { }

 ngOnInit() {


$(document).ready(function(){


    $("#show2").click(function(){
        $("#panel").fadeOut(1000);
        $("#show2").fadeOut();
        $("#flip").fadeIn(9000);

    });
     $("#flip").click(function(){
       $("#flip").fadeOut();
        $("#panel").slideToggle(1500);
        $("#show2").slideToggle(3000);


    });
      $("#show3").click(function(){
        $("#panel1").slideToggle(1500);
        $("#show1").slideToggle(3000);
        $("#show3").fadeOut();

    });
      $("#show1").click(function(){
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
      //             console.log(response)
      //         })
      //         .catch(error => {
      //             console.log(error);
      //         });
      //
      // });


  }


}
