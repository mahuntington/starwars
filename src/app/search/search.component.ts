import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    results;

    constructor(
        private http: Http
    ) { }

    findCharacter(name){
        const result = this.http.get('http://swapi.co/api/people/?search=' + name)
        .map((response)=>{
            return response.json().results;
        }).subscribe(
            (response)=>{
                this.results = response;
            }
        );
        // .toPromise()
        // .then(response => console.log(this.results = response.json().results) );
    }

    ngOnInit() {
    }

}
