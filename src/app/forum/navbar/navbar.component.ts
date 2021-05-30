import { Component, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataManagerService } from "../../data-manager.service";
import { Topic } from "../../model/Topic";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() topics: Topic[];
  public items: MenuItem[];

  posts: any[] = null;
  constructor(){}


  ngOnInit(): void {
    this.items = [];
    for (let i = 0; i < this.topics.length; i++){
      const obj = {
        label: this.topics[i].topicName,
        routerLink: [`/topics/${this.topics[i].topicId}/posts`], queryParams: {p: 1}
      };
      this.items.push(obj);
    }
  }

}
