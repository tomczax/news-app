import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from "@angular/core";

import { Article } from "angular-news-api";
import { fromEvent, Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, map, takeUntil } from "rxjs/operators";

import { NewsService } from "../news.service";

@Component({
    selector: "app-news",
    templateUrl: "./news.component.html",
    styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild("searchInput") searchInput: ElementRef;

    public articles$: Observable<Article[]>;
    public loading$: Observable<boolean>;
    public search: string;
    public searchProgressValue = 0;

    private destroyed$ = new Subject<void>();

    constructor(public newsService: NewsService) {}

    public ngOnInit() {
        this.newsService.fetchArticles(null);

        this.articles$ = this.newsService.articles$;
        this.loading$ = this.newsService.articlesLoading$;
    }

    ngAfterViewInit() {
        this.listenForSearch();
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    get notFoundText(): string {
        return (
            "No articles found" +
            (this.newsService.currentSearchValue
                ? ` for "${this.newsService.currentSearchValue}"`
                : "")
        );
    }

    private listenForSearch(): void {
        fromEvent(this.searchInput.nativeElement, "keyup")
            .pipe(
                takeUntil(this.destroyed$),
                map((event: any) => event.target.value),
                debounceTime(750),
                distinctUntilChanged()
            )
            .subscribe((searchValue: string) =>
                this.newsService.fetchArticles(searchValue)
            );
    }
}
