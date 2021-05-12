import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/spinner/spinner.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  portfolios;

  constructor(private http: HttpClient, private spinner: SpinnerService) { }

  split(url, name) {
    var n = url.substring(url.lastIndexOf('/') + 1);

    if(!n.includes("profile.php?id")) {
      return "facebook.com/" + n;
    }
    else {
      return "facebook.com/" + name.split(' ').join('.');
    }

  }

  ngOnInit(): void {
    this.spinner.requestStarted();
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("sections-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.add("bg-default");


    this.http.get("https://api.ecell.in/invitation/portfolios/").subscribe(
      data=> {
        // console.log(data);
        this.portfolios = data;
        this.spinner.requestEnded()
      }
    )
  }

}
