import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from "../../models/offer";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [DatePipe]
})
export class PostComponent implements OnInit{
  auth!: object
  @Input() canDelete!: boolean
  @Input() offer!: Offer
  @Output() clicked = new EventEmitter<void>();

  constructor(private datePipe: DatePipe) {
  }

  onClickTest(){
    this.clicked.emit();
  }

  ngOnInit(): void {
    if(localStorage.getItem("auth")){
      // @ts-ignore
      this.auth = JSON.parse(localStorage.getItem("auth"));
    }
  }


}
