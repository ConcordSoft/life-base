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

 
  }

  
   
}