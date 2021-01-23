import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from "@angular/core";

import { Article, TopHeadlinesResponse } from "angular-news-api";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, map, tap } from "rxjs/operators";

import { NewsService } from "../news.service";

@Component({
    selector: "app-news",
    templateUrl: "./news.component.html",
    styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit, AfterViewInit {
    @ViewChild("searchInput") searchInput: ElementRef;

    public articles: Article[] = [];
    public search: string;
    public searchProgressValue = 0;
    private currentSearchValue = "";

    constructor(private newsService: NewsService) {}

    public ngOnInit() {
        if (!this.articles.length) {
            this.fetchArticles();
        }
    }

    ngAfterViewInit(): void {
        this.listenForSearch();
    }

    get notFoundText(): string {
        return (
            "No articles found" +
            (this.currentSearchValue ? ` for "${this.currentSearchValue}"` : "")
        );
    }

    private fetchArticles(search?: string): void {
        // TODO Add progress event
        this.newsService
            .topHeadlines(search)
            .pipe(tap((response) => console.log(response)))
            .subscribe(
                (response: TopHeadlinesResponse) =>
                    (this.articles = response.articles)
            );
    }

    private listenForSearch(): void {
        fromEvent(this.searchInput.nativeElement, "keyup")
            .pipe(
                map((event: any) => event.target.value),
                debounceTime(750),
                distinctUntilChanged()
            )
            .subscribe((searchValue: string) => {
                this.currentSearchValue = searchValue;
                this.fetchArticles(searchValue);
            });
    }
}
