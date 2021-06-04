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
      var obj = {};
      if(i == 0){
        obj = {
          label: this.topics[i].topicName,
          styleClass : 'active',
          routerLink: [`/topics/${this.topics[i].topicId}/posts`], queryParams: {p: 1}
        };
      }
      else{
        obj = {
          label: this.topics[i].topicName,
          routerLink: [`/topics/${this.topics[i].topicId}/posts`], queryParams: {p: 1}
        };
      }
      this.items.push(obj);
    }
  }
  activeMenu(event) {
    console.log(event.target.className);
    let node;
    if (event.target.className === "p-menuitem-text ng-star-inserted") {
      node = event.target.parentNode;
    } else {
      console.log("huhu");
      node = event.target.parentNode;
    }
    let menuitem = document.getElementsByClassName("p-menuitem-link p-ripple ng-star-inserted");
    console.log(menuitem);
    for (let i = 0; i < menuitem.length; i++) {
      menuitem[i].classList.remove("active");
    }
    node.classList.add("active")}

}
