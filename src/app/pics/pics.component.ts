import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
  styleUrls: ['./pics.component.css']
})
export class PicsComponent implements OnInit, OnDestroy {
  firstpicts: any[] = [];
  subscription: Subscription = new Subscription;

  current: string[] = [];

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

  async PopUp(url:string)
  {
    let newWin = window.open("Info", "hello", "width=500,height=400,scrollbars=1");

    let arrays = url.split('/');
    let sub_arrays = arrays[4].split('_');
    let photo_id = sub_arrays[0];
    let secret = sub_arrays[1].split('.')[0];

    let sentence = "https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=098c9063a6acb12615655508f6e6586d"+
    "&photo_id="+photo_id+"&secret="+secret+
    "&format=json&nojsoncallback=1";

    let getting_info_1 = await this.dataService.testing_search(sentence);
    // get author
    let author = getting_info_1.photo.owner.realname;
    let author_place = getting_info_1.photo.owner.location;
    let author_id = getting_info_1.photo.owner.nsid;
    let author_sentence = "Author is "+author+" from " +author_place+".\n";

    // autres photos de l'auteur
    let sentence2 = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=098c9063a6acb12615655508f6e6586d"+
    "&user_id="+author_id+"&per_page=10"+
    "&format=json&nojsoncallback=1";

    const response = await fetch(sentence2);
    const body = await response.json();
      for (const pic of body.photos.photo) {
        let sentence = "https://live.staticflickr.com/"+pic.server+"/"+pic.id+"_"+pic.secret+".jpg";
        this.current.push(sentence);
      }

    // Commentaires de la photo
    let comments = getting_info_1.photo.comments._content;
    let comments_sentence = "The number of comments are "+comments+".\n";


    // Position géographique
    let location = "";
    if (getting_info_1.photo.location !== undefined)
    {
      let country = getting_info_1.photo.location.country._content;
      let county = getting_info_1.photo.location.county._content;
      let region = getting_info_1.photo.location.region._content;
      location = "The picture was taken in the region of " + region
      + " in " + county+ " in "+ country+".\n";
    }

    if (newWin !== null)
    {
      let sentence = '<html><head><title>Info</title></head>'
      +'<div class="info">'
      + '<h2>More info about said picture \n</h2>'
      + "<img width=\"400px\" height=\"200px\"src=\""+url+"\" >"
      + '</div></html>';
      newWin.document.writeln(sentence);

      //sentence += '<label>'+author_sentence+'</label>';
      newWin.document.writeln('<h3>'+"Owner of the picture"+'</h3>');
      newWin.document.writeln('<label>'+author_sentence+'</label>');
      //sentence += '<label>'+location+'</label>';
      newWin.document.writeln('<h3>'+"Location of the picture"+'</h3>');
      newWin.document.writeln( '<label>'+location+'</label>');
      //sentence += '<label>'+comments_sentence+'</label>';
      newWin.document.writeln('<h3>'+"Comments of the picture"+'</h3>');
      newWin.document.writeln('<label>'+comments_sentence+'</label>');
      newWin.document.writeln('<h2>'+"10 top pictures from owner"+'</h2>');
      for (let index = 0; index < this.current.length && index < 10; index++) {
        const element = this.current[index];
        newWin.document.writeln("<img width=\"400px\" height=\"200px\"src=\""+element+"\" >");
      }
      newWin.document.close();
    }
  }

}
