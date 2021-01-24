import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Article } from "angular-news-api";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { ArticleComment } from "../models/comment.model";

@Component({
    selector: "app-news-detail",
    templateUrl: "./news-detail.component.html",
    styleUrls: ["./news-detail.component.scss"],
})
export class NewsDetailComponent implements OnInit {
    public article$: Observable<Article>;

    public comments: ArticleComment[] = [
        {
            name: "Chris Nat",
            date: new Date(),
            avatar: "/assets/images/1.jpg",
            comment: `Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat`,
        },
        {
            name: "Matt Damon",
            date: new Date(),
            avatar: "/assets/images/2.jpg",
            comment: `Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. `,
        },
        {
            name: "Seb Willhelm",
            date: new Date(),
            avatar: "/assets/images/3.jpg",
            comment: `Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.`,
        },
    ];

    constructor(
        public activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    get commentsTitle(): string {
        const commentsCount = this.comments.length;
        return commentsCount === 1 ? "1 Comment" : `${commentsCount} Comments`;
    }

    public ngOnInit() {
        this.article$ = this.activatedRoute.paramMap.pipe(
            map(() =>
                window.history.state.navigationId === 1
                    ? null
                    : window.history.state
            ),
            tap(
                (state: any) =>
                    state === null && this.router.navigate(["/news"])
            )
        );
    }

    // Open original article in new tab
    public goToArticle(url: string): void {
        window.open(url, "_blank");
    }
}
