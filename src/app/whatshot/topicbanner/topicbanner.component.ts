import { Component, OnInit } from '@angular/core';
import { DataManagerService } from "../../data-manager.service";
import { Post } from "../../model/Post";
import { TopicStats } from "../../model/Topic";

@Component({
  selector: 'app-topicbanner',
  templateUrl: './topicbanner.component.html',
  styleUrls: ['./topicbanner.component.css']
})
export class TopicbannerComponent implements OnInit {
  public topics: TopicStats[];

  constructor(
    private dataService: DataManagerService
  ) { }

  ngOnInit(): void {
    this.dataService.getTopicStats().subscribe((topics) => {
      this.topics = topics;
    });
  }

  public reload(){
    this.dataService.getTopicStats().subscribe((topics) => {
      this.topics = topics;
    });
  }

}
