import { Component, OnInit } from '@angular/core';
import { toArray } from 'rxjs';
import { DataService } from '../data.service';

function isDate(searchTerm: string)
{
  let i = 0;
  // YYYY
    for (let k = i; i < k + 4; i++) {
      if (!Number.isInteger(Number(searchTerm[i])))
      {
        return false;
      }
    };
    // -
    if (searchTerm[i] !== '-')
    {
      return false;
    }
    i++;
    // MM
    for (let k = i; i < k + 2; i++) {
      if (!Number.isInteger(Number(searchTerm[i])))
      {
        return false;
      }
    }
    // -
    if (searchTerm[i] !== '-')
    return false;
  i++;
  // DD
  for (let k = i; i < k + 2; i++) {
    if (!Number.isInteger(Number(searchTerm[i])))
    {
      return false;
    }
  }
  // ' '
  if (searchTerm[i] !== ' ')
    return false;
  i++;
  // hh
  for (let k = i; i < k + 2; i++) {
    if (!Number.isInteger(Number(searchTerm[i])))
    {
      return false;
    }
  }
  // :
  if (searchTerm[i] !== ':')
    return false;
  i++;
  // mm
  for (let k = i; i < k + 2; i++) {
    if (!Number.isInteger(Number(searchTerm[i])))
    {
      return false;
    }
  }
  // :
  if (searchTerm[i] !== ':')
    return false;
  i++;
  // ss
  for (let k = i; i < k + 2; i++) {
    if (!Number.isInteger(Number(searchTerm[i])))
    {
      return false;
    }
  }
  return true;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private dataService: DataService) { }
  minupload_date: string = '';
  text_search: string = '';

  ngOnInit(): void {
  }

  search(searchTerm: string)
  {
    if (searchTerm !== '')
    {
      this.text_search = searchTerm;
      this.dataService.searchImage_Param(this.text_search, this.minupload_date);
    }
  }

  setMinuploaddate(searchTerm: string)
  {
    // Use regex here
    
    if (isDate(searchTerm))
    {
      this.minupload_date = searchTerm;
      if (this.text_search !== '')
      {
        this.dataService.searchImage_Param(this.text_search, this.minupload_date);
      }
    }

  }

}
