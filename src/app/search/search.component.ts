import { Component, OnInit } from '@angular/core';

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
        private characterSearchService: SearchService,
    ) { }

    findCharacter(name){
        this.searchTerms.next(name);
    }

    ngOnInit() {
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(name => {
                this.characterSearchService.createAPIObservable(name).subscribe(results => {
                    this.results = results.json().results;
                })
            })
    }

}
