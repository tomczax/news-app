import { Injectable } from "@angular/core";

import {
    NewsApiService,
    TopHeadlinesConfig,
    TopHeadlinesResponse,
} from "angular-news-api";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class NewsService {
    constructor(private newsApiService: NewsApiService) {}

    topHeadlines(searchValue?: string): Observable<TopHeadlinesResponse> {
        const config: TopHeadlinesConfig = {
            language: "en",
        };

        if (searchValue) {
            config.q = searchValue;
        }

        return this.newsApiService.topHeadlines(config);
    }
    /**
     * Consume the NewsApiService here, make sure
     * to set the language to 'en' english and built
     * in the search functionality using the 'q'
     * variable in API calls to news-api
     */
}
