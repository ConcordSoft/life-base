import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
    $("#flip").click(function(){
       $("#flip").fadeOut();
        $("#panel").slideToggle(1500);
        $("#show2").slideToggle(3000);
        

    });
});
$(document).ready(function(){
    $("#show").click(function(){
        $("#panel1").slideToggle(1500);
        $("#show1").slideToggle(3000);
        $("#show").fadeOut();

    });
});
$(document).ready(function(){
    $("#show1").click(function(){
        $("#panel1").fadeOut(1000);
        $("#show1").fadeOut();
        $("#show").fadeIn(9000);
       

    });
});
$(document).ready(function(){
    $("#show2").click(function(){
        $("#panel").fadeOut(1000);
        $("#show2").fadeOut();
        $("#flip").fadeIn(9000);
       

    });
});
  autoPlayYouTubeModal();

  //FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
  function autoPlayYouTubeModal() {
      var trigger = $("body").find('[data-toggle="modal"]');
      trigger.click(function () {
          var theModal = $(this).data("target"),
              videoSRC = $(this).attr("data-theVideo"),
              videoSRCauto = videoSRC + "?autoplay=1";
          $(theModal + ' iframe').attr('src', videoSRCauto);
          $(theModal + ' button.close').click(function () {
              $(theModal + ' iframe').attr('src', videoSRC);
          });
      });
  }
      var handler = StripeCheckout.configure({
          key: 'pk_test_QvHMW8tDmDlsoHiKsyt4P77i',
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          locale: 'auto',
          token: function(token) {
              // You can access the token ID with `token.id`.
              // Get the token ID to your server-side code for use.
              // console.log(token);
              localStorage.setItem('token', JSON.stringify(token.id));
              console.log(localStorage.getItem('token'));
          }
      });

      document.getElementById('customButton').addEventListener('click', function(e) {
          // Open Checkout with further options:
          handler.open({
              name: 'Life Base',
              description: 'Description text',
              amount: 18000,
              allowRememberMe: false
          });
          e.preventDefault();
      });

      // Close Checkout on page navigation:
      if(localStorage.getItem('token')) {
          window.addEventListener('popstate', function() {
              handler.close();
          });
      }

 
  }

  
   
}