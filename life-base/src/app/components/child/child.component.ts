import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { 
  }

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




 
  }

 
  }
