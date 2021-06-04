import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { TimeConverter } from '../../Utils/TimeConverter';
import { DataManagerService } from '../../data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

export class FilterKeywords{
  constructor() {
    this.tags = null;
    this.s = new Date('2021-01-01');
    this.e = new Date();
    this.sortBy = 'posts';
    this.order = 'desc';
  }
  tags: string;
  s: Date;
  e: Date;
  sortBy: string;
  order: string
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  private topicID: number;
  public tags: any;
  public currentTag: any;
  public filteredKeyword = new FilterKeywords();
  public isDisplayFilter = false;
  constructor(
    private dataService: DataManagerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.topicID = params.topicId;
      this.isDisplayFilter = false;
    });
  }

  handleDisplayFilter( event ): void {
    const targetElement = event.target.attributes[1].value;
    if (targetElement === 'pi pi-filter'){
      if (!this.isDisplayFilter){
        this.isDisplayFilter = true;
      }
      else{
        this.isDisplayFilter = false;
      }
    }
  }

  doFilter(): void{
    this.tags = this.dataService.getAllTags()
      .pipe(map(tag => this.filter(tag)),
      );
  }

  filter(values): any{
    return values.filter(tag => tag.tagName.toLowerCase().includes(this.currentTag));
  }

  onSubmit(f: NgForm): void {
    const utils = new TimeConverter();

    f.value.start = utils.convertToYYYYMMDD(f.value.start);
    f.value.end = utils.convertToYYYYMMDD(f.value.end);
    f.value.searchTag  = (f.value.searchTag === undefined) ? '' : f.value.searchTag;

    this.router.navigate([`topics/${this.topicID}/posts`], {queryParams:
        {
          p: 1,
          tags: f.value.searchTag,
          s: f.value.start,
          e: f.value.end,
          sortBy: f.value.sortedBy,
          order: f.value.order
        }});

  }


}
