import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goToUploadVideoFromLibrary() {
    this.router.navigate(['upload-student-video'], { queryParams: { source: "library" } });
  }

  public goToUploadVideoFromFromCamera() {
    this.router.navigate(['upload-student-video'], { queryParams: { source: "camera" } });
  }

}
