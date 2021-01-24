import { Injectable } from "@angular/core";

import {
    Article,
    NewsApiService,
    TopHeadlinesConfig,
    TopHeadlinesResponse,
} from "angular-news-api";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, take } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class NewsService {
    private _articles$ = new BehaviorSubject<Article[]>([]);
    private _loading$ = new BehaviorSubject<boolean>(false);
    private _currentSearchValue: string | null = null;

    constructor(private newsApiService: NewsApiService) {}

    get articles$(): Observable<Article[]> {
        return this._articles$.asObservable();
    }

    get articlesLoading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    get currentSearchValue(): string | null {
        return this._currentSearchValue;
    }

    // Pass null on component init or string on search input
    fetchArticles(searchValue: string | null): void {
        // TODO Add progress event
        // TODO remove
        const localArticles = JSON.parse(localStorage.getItem("articles"));

        if (localArticles) {
            console.log({ localArticles });

            this._articles$.next(localArticles);
            return;
        }
        ///////////////////////////////////////////////////////////////////

        if (
            (searchValue === null && this.currentSearchValue) ||
            searchValue === this.currentSearchValue
        ) {
            // Fetch articles only if empty on component init or search value was not changed
            this.fetchArticlesIfEmpty(this.currentSearchValue);
        } else {
            // Fetch new articles on search input change
            this.topHeadlines(searchValue);
            // Set currentSearchValue on search input change
            this._currentSearchValue = searchValue;
        }
    }

    topHeadlines(searchValue?: string): void {
        const config: TopHeadlinesConfig = {
            language: "en",
            sources:
                "news24, nbc-news, cnn, fox-news, bbc-news, financial-times",
        };

        if (searchValue) {
            config.q = searchValue;
        }

        this._loading$.next(true);
        this.newsApiService
            .topHeadlines(config)
            .subscribe((response: TopHeadlinesResponse) => {
                console.log(response);

                this._loading$.next(false);
                this._articles$.next(response.articles);
                // TODO remove
                localStorage.setItem(
                    "articles",
                    JSON.stringify(response.articles)
                );
            });
    }

    private fetchArticlesIfEmpty(searchValue: string | null): void {
        this._articles$
            .pipe(
                take(1),
                filter((currentArticles: Article[]) => !currentArticles.length)
            )
            .subscribe(() => this.topHeadlines(searchValue));
    }
}
