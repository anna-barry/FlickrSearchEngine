import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
  styleUrls: ['./pics.component.css']
})
export class PicsComponent implements OnInit, OnDestroy {
  firstpicts: any[] = [];
  subscription: Subscription = new Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSomeImages();
    this.subscription = this.dataService.getPics()
    .subscribe((response: any) => 
    {
      this.firstpicts = response;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe;
  }

}
