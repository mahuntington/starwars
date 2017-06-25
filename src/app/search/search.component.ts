import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    results;
    searchTerms = new Subject<string>();

    constructor(
        private http: Http
    ) { }

    findCharacter(name){
        this.searchTerms.next(name);
    }

    createAPIObservable(name){
        return this.http.get('http://swapi.co/api/people/?search=' + name)
        .map((response)=>{
            return response.json().results;
        });
    }

    ngOnInit() {
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(name => this.createAPIObservable(name))
            .subscribe(results=> this.results = results );
    }

}
