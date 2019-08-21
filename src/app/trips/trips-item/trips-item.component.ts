import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trips-item',
  templateUrl: './trips-item.component.html',
  styleUrls: ['./trips-item.component.scss']
})
export class TripsItemComponent implements OnInit {
  @Input() trip: TripI.Info;

  constructor() { }

  ngOnInit() {
  }

}
