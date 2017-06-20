import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    constructor(
        private http: Http
    ) { }

    findCharacter(name){
        this.http.get('http://swapi.co/api/people/?search=' + name)
        .toPromise()
        .then(response => console.log(response.json()));
    }

    ngOnInit() {
    }

}
