import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.css']
})
export class SonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
    $("#flip").click(function(){
        $("#panel").slideToggle("slow");
    });
});
$(document).ready(function(){
    $("#show").click(function(){
        $("#panel1").slideToggle("slow");
    });
});
  }
 

}
