import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationsService } from 'src/app/new-services/invitations.service';

@Component({
  selector: 'app-invitation-details',
  templateUrl: './invitation-details.component.html',
  styleUrls: ['./invitation-details.component.css']
})
export class InvitationDetailsComponent implements OnInit {

  public myParam: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private InvitationsService: InvitationsService) {

  }


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params);
      this.myParam = params;
    });

  }


  Decline() {

  }

  Accept() {
    this.router.navigateByUrl("/profile/mealRequest");
  }

}
