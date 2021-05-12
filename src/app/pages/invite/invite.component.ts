import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import { Injectable, Type } from '@angular/core';
import { SpinnerService } from 'src/app/spinner/spinner.service';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js'

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  roll_no;
  name;
  text_img = "E-Cell";
  colour;
  batch;
  focus15;
  focus;
  email;
  mob;
  mob_error_req = false;
  position = "position";
  company = "company";
  lucky; 
  showmsg = "";

  @ViewChild('modalform') modal: ModalDirective;
  @ViewChild('modaldefault') lucky_draw_modal: ModalDirective;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private spinner: SpinnerService) { }

  update(){
    const pattern = /[0-9\+\-\ ]/;
    if(!pattern.test(this.mob)){
      this.mob_error_req= true;
      this.showmsg = "mobile invalid";
      return;
    }
  const patt= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!patt.test(this.email)){
      this.showmsg = "email invalid";
      return;
    }


    // if()
    console.log(this.email, this.mob);
    var url = "https://api.ecell.in/invitation/update/"+ this.roll_no + "/";

    var body = new FormData();
    body.append('roll', this.roll_no);
    body.append('mobile', this.mob);
    body.append('email', this.email);

    this.http.post(url, body).subscribe(
      data => {
        this.showmsg = "";
        console.log(data);
        this.modal.hide();
        alert("You're Email and Phone have been submitted");
      }
    )

  }
  ngOnInit(): void {
    this.spinner.requestStarted();
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");

    var colours = ['571557', 'c40606', '1c1787', '571557']

    var rand = Math.floor(Math.random()*4);

    this.colour = colours[rand];
    

    this.roll_no = this.route.snapshot.queryParamMap.get('q');
    
    if(!this.roll_no){
      this.roll_no = localStorage.getItem('roll_no');
    }

    if(!(this.roll_no)){
      console.log('no-roll-number');
      this.router.navigate(['no-roll-number']);
    }

    var url = "https://api.ecell.in/invitation/student/"+ this.roll_no + "/";

    this.http.get(url).subscribe(
      data => {
        this.name = data['name'];
        var initials = this.name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        this.text_img = initials;
        this.batch = data['batch'];
        this.position = data['position'];
        this.company = data['company'];
        this.lucky = data['lucky_draw'];
        this.createNewScratchCard();
        this.spinner.requestEnded();
      },
      error => {
        // alert("Something went wrong. Re enter your roll number to continue.");
        body.classList.remove("profile-page");
        this.router.navigate(['no-roll-number']);
        this.spinner.requestEnded();
      }
    );

    localStorage.setItem('roll_no', this.roll_no);
  }


  createNewScratchCard() {
    // const scContainer = document.getElementById('js--sc--container');
    const sc = new ScratchCard('#js--sc--container', {
      scratchType: SCRATCH_TYPE.CIRCLE,
      containerWidth: 300 ,//scContainer.offsetWidth,
      containerHeight: 300,
      imageForwardSrc: '/test/assets/img/logo_ecell.png',
      //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
      htmlBackground: '<div class="cardamountcss text-center"><div class="won-amnt">'+this.lucky+'</div><div class="won-text">Your lucky draw ID</div></div>',
      clearZoneRadius: 40,
      nPoints: 30,
      pointSize: 4,
      callback: () => {
        console.log('Card Scratched')
      }
    })
    // Init
    sc.init();
  }

}
