import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { FilterService } from "primeng/api";
import { CountryService } from "../countryservice";


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  //
  items: MenuItem[];
  ngOnInit(): void {
    this.items = [
      {
          label: 'Assignment Help'
      },
      {
          label: 'Exam Preparation'
      },
      {
          label: 'Side Projects'
      },
      {
          label: 'Coop Jobs/ Internship'
      },
      {
          label: 'Volunteer'
      },
      {
          label: 'HackerRank'
      },
      {
          label: 'Fulltime/ Part-time Jobs'
      },
      {
          label: 'Dating'
      }

  ];

   }
  
}
