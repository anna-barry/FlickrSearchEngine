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
    /*.subscribe((response: any) => {
      //console.log('Data', response);
      //console.log(response.photos.photo)
      //let i = 0;
      for (const pic of response.photos.photo) {
        let sentence = "https://live.staticflickr.com/"+pic.server+"/"+pic.id+"_"+pic.secret+".jpg";
        this.firstpicts.push(sentence);
      
      }
    });*/
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe;
  }

}
