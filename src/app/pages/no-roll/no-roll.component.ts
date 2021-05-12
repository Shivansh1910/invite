import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-roll',
  templateUrl: './no-roll.component.html',
  styleUrls: ['./no-roll.component.scss']
})
export class NoRollComponent implements OnInit, OnDestroy {
  focus;
  roll;
  constructor(private http: HttpClient, private router: Router) { }

  check(){
    console.log(this.roll);
    var url = "https://api.ecell.in/invitation/student/"+ this.roll + "/";

    this.http.get(url).subscribe(
      data => {
        localStorage.setItem('roll_no', this.roll);
        this.router.navigate(['']);
      },
      error => {
        alert("This roll number seems to be wrong.");
      }
    );
  }

  ngOnInit(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("reset-page");

  }
  ngOnDestroy():void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("reset-page");
  }

}
