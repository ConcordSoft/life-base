import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-husband',
  templateUrl: './husband.component.html',
  styleUrls: ['./husband.component.css']
})
export class HusbandComponent implements OnInit {

  constructor() { }

 ngOnInit() {
    $(document).ready(function(){
    $("#flip").click(function(){
        $("#panel").slideToggle("slow");
        $("#show2").slideToggle("slow");
         $("#flip").fadeOut("slow");

    });
});
$(document).ready(function(){
    $("#show").click(function(){
        $("#panel1").slideToggle("slow");
        $("#show1").slideToggle("slow");
        $("#show").fadeOut("slow");

    });
});
$(document).ready(function(){
    $("#show1").click(function(){
        $("#panel1").fadeOut("slow");
        $("#show1").fadeOut("slow");
        $("#show").fadeIn("slow");
       

    });
});
$(document).ready(function(){
    $("#show2").click(function(){
        $("#panel").fadeOut("slow");
        $("#show2").fadeOut("slow");
        $("#flip").fadeIn("slow");
       

    });
});
  }
 

}
