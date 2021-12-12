import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showSideBar: boolean = false;
  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.location.onUrlChange(() => {
      this.showSideBar = false;
    });
  }



  toggleSideBar():void {
    this.showSideBar = !this.showSideBar;
  }

  gotToURL(url:string) {
    this.toggleSideBar();
    this.router.navigateByUrl(url);
  }
}
