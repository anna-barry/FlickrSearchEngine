import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  firstpicts = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  getSomeImages()
  {
    return this.http.get(' https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=098c9063a6acb12615655508f6e6586d&text=landscape&per_page=100&page=1&format=json&nojsoncallback=1')
    .subscribe((response: any)=> {
      //this.firstpicts.next(response.data);
      let current = [];
      for (const pic of response.photos.photo) {
        let sentence = "https://live.staticflickr.com/"+pic.server+"/"+pic.id+"_"+pic.secret+".jpg";
        current.push(sentence);
      }
      this.firstpicts.next(current);
    });
  }

  searchImage(ImageName: string)
  {
    return this.http.get("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=098c9063a6acb12615655508f6e6586d&text="+ImageName+"&per_page=50&page=1&format=json&nojsoncallback=1")
    .subscribe((response: any)=> {
      //this.firstpicts.next(response.data);
      let current = [];
      for (const pic of response.photos.photo) {
        let sentence = "https://live.staticflickr.com/"+pic.server+"/"+pic.id+"_"+pic.secret+".jpg";
        current.push(sentence);
      }
      this.firstpicts.next(current);
    });
  }

  searchImage_Param(ImageName: string, minupload_date: string)
  {
    let sentence = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key="+
    "098c9063a6acb12615655508f6e6586d&text="+ImageName;

    if (minupload_date !== '')
      sentence += "&min_upload_date="+minupload_date
    
    sentence += "&per_page=50&page=1&format=json&nojsoncallback=1";

    return this.http.get(sentence)
    .subscribe((response: any)=> {
      //this.firstpicts.next(response.data);
      let current = [];
      for (const pic of response.photos.photo) {
        let sentence = "https://live.staticflickr.com/"+pic.server+"/"+pic.id+"_"+pic.secret+".jpg";
        current.push(sentence);
      }
      this.firstpicts.next(current);
    });
  }

  getPics()
  {
    return this.firstpicts.asObservable();
  }


}
