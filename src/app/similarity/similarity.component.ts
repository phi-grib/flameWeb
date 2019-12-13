import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-similarity',
  templateUrl: './similarity.component.html',
  styleUrls: ['./similarity.component.css']
})
export class SimilarityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    alert("Similarity");
  }

}
