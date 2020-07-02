import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styles: [
  ]
})
export class PageTitleComponent implements OnInit {

  @Input() title: String;
  @Input() subtitle: String;
  @Input() icon: String;
  @Input() bText: String;
  @Input() bIcon: String;
  @Input() bVisible: boolean = true;
  @Input() route: String;

  constructor() { }

  ngOnInit(): void {
  }

}
