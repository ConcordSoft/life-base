import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import * as $ from 'jquery';
import { UserService } from './../../_services/index';
import { SessionService } from './../../_core/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _UserService: UserService, private _SessionService: SessionService) {}

  ngOnInit() {

    $(document).ready(function () {
      $("#show").click(function () {
        $("#panel1").slideToggle("slow");
      });
      $("#flip").click(function () {
        $("#panel").slideToggle("slow");
      });

    });
    $(document).ready(function () {
      // Add smooth scrolling to all links
      $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 3000, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
    });

    // check
    this.checkIfLoggedIn();

  }

  signedIn = false;
  user: Object = {};

  checkIfLoggedIn() {
    this.signedIn = this._SessionService.isAuth();
  }

  register() {
    this._UserService.register(this.user).subscribe(response => {
      // put user data in session
      this._SessionService.create(response);
      this.user = {};
      console.log('registered and logged in');
      this.signedIn = true;
    }, error => {
      console.log('Error registering user' + this.user);
    });
  }

  login() {
    this._UserService.login(this.user['em'], this.user['pw']).subscribe(response => {
      this._SessionService.create(response);
      this.user = {};
      console.log('logged in');
      this.signedIn = true;
    }, error => {
      console.log('Error loggin in user' + this.user);
    });
  }

  logout() {
    this._SessionService.destroy();
    this.signedIn = false;
  }

}