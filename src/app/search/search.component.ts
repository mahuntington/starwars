import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

// Observable operators
import 'rxjs/add/operator/catch';
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

        // const result = this.http.get('http://swapi.co/api/people/?search=' + name)
        // .map((response)=>{
        //     return response.json().results;
        // }).subscribe(
        //     (response)=>{
        //         this.results = response;
        //     }
        // );

        // .toPromise()
        // .then(response => console.log(this.results = response.json().results) );
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
            .switchMap(term => this.createAPIObservable(term))
            .subscribe((results)=>{
                this.results = results;
            });
    }

}
