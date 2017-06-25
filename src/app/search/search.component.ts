import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { SearchService } from './search.service';

// Observable class extensions
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SearchService]
})
export class SearchComponent implements OnInit {
    results;
    searchTerms = new Subject<string>();

    constructor(
        private heroSearchService: SearchService,
        private http: Http
    ) { }

    findCharacter(name){
        this.searchTerms.next(name);
    }

    ngOnInit() {
        this.results = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(name => this.heroSearchService.createAPIObservable(name));
    }

}
