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
        $("#panel").slideToggle("slow")
    });
});
$(document).ready(function(){
    $("#show").click(function(){
        $("#panel1").slideToggle("slow")
    });
});
  }
 

}
