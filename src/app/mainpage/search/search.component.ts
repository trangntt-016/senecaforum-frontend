import { Component, OnInit } from '@angular/core';
import { PostSearchDto } from '../../model/Post';
import { DataManagerService } from '../../data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentConverter } from '../../Utils/ContentConverter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public keyword: string;
  private utils = new ContentConverter();
  public posts: PostSearchDto[] = [];
  constructor(
    private dataService: DataManagerService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.keyword = params.content;
      // reload data when default
      this.dataService.searchPostsByContent(this.keyword).subscribe(posts => {
        this.posts = posts;
        posts.forEach(p => {
          const startSpan = p.content.slice(0, p.idxKeywords[0]) + '<span class="highlight">';
          const endSpan = '</span>' + p.content.slice(p.idxKeywords[1]);
          const newContent = startSpan + p.content.slice(p.idxKeywords[0], p.idxKeywords[1]) + endSpan;
          p.content = newContent;
        });
      }, error => {
        if (error.status === 403){
          this._snackBar.open('Your login session has expired!', 'Got it!');
          this.auth.logout();
          this.router.navigate(['login']);
        }
      });
    });
  }

}
