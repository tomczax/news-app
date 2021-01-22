import { Injectable } from '@angular/core';

import { NewsApiService, TopHeadlinesResponse } from 'angular-news-api';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    constructor(private newsApiService: NewsApiService) {}

    topHeadlines(): Observable<TopHeadlinesResponse> {
       return this.newsApiService.topHeadlines({
              sources: 'bbc-news,the-verge'
            });
       }
    /**
     * Consume the NewsApiService here, make sure
     * to set the language to 'en' english and built
     * in the search functionality using the 'q'
     * variable in API calls to news-api
     */
}
