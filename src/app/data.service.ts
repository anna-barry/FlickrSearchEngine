import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  firstpicts = new BehaviorSubject<any>([]);
  infopicts = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  getSomeImages()
  {
    return this.http.get(' https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=098c9063a6acb12615655508f6e6586d&text=landscape&sort=relevance&per_page=100&page=1&format=json&nojsoncallback=1')
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

  searchImage_Param(ImageName: string, minupload_date: string, maxupload_date: string, date_posted_asc: boolean,
    date_posted_desc: boolean,
    date_taken_asc: boolean,
    date_taken_desc: boolean,
    relevance: boolean,
    tags: string,
    is_gallery: boolean,
    NSFW: boolean )
  {
    let sentence = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key="+
    "098c9063a6acb12615655508f6e6586d&text="+ImageName;

    if (minupload_date !== '')
      sentence += "&min_upload_date="+minupload_date;

    if (maxupload_date !== '')
      sentence += "&max_upload_date="+maxupload_date;

    if (tags !== '')
      sentence += "&tags="+tags;

    if (is_gallery)
      sentence += "&in_gallery=true";

    if (!NSFW)
      sentence += "&safe_search=3";

    if (date_posted_asc)
      sentence += "&sort=date-posted-asc";
    
    if (date_posted_desc)
      sentence += "&sort=date-posted-desc";
    
    if (date_taken_asc)
      sentence += "&sort=date-taken-asc";

    if (date_taken_desc)
      sentence += "&sort=date-taken-desc";

    if (relevance)
      sentence += "&sort=relevance";

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

  async search_for_info(sentence: string)
  {
    return this.http.get(sentence)
    .subscribe((response: any)=> {
      this.infopicts.next(response.photo);
    });
  }

  async testing_search(sentence: string)
  {
    const response = await fetch(sentence);
    const body = await response.json();
    return body;
  }
  
  getPics()
  {
    return this.firstpicts.asObservable();
  }

  getInfo()
  {
    return this.infopicts.asObservable();
  }


}
