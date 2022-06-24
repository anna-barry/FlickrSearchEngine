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
  maxupload_date: string = '';
  text_search: string = '';
  tags: string = '';

  // Sort
  date_posted_asc: boolean = false;
  date_posted_desc: boolean = false;
  date_taken_asc: boolean = false;
  date_taken_desc: boolean = false;
  relevance: boolean = false;
  is_gallery: boolean = false;
  NSFW: boolean = true;

  ngOnInit(): void {
  }

  search(searchTerm: string)
  {
    if (searchTerm !== '')
    {
      this.text_search = searchTerm;
      /*this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
        this.date_posted_desc,
        this.date_taken_asc,
        this.date_taken_desc,
        this.relevance,
        this.tags,
        this.is_gallery,
        this.NSFW);*/
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
        this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
          this.date_posted_desc,
          this.date_taken_asc,
          this.date_taken_desc,
          this.relevance,
          this.tags,
          this.is_gallery,
          this.NSFW);
      }
    }
  }

  setMaxuploaddate(searchTerm: string)
  {
    // Use regex here
    
    if (isDate(searchTerm))
    {
      this.maxupload_date = searchTerm;
      if (this.text_search !== '')
      {
        this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
          this.date_posted_desc,
          this.date_taken_asc,
          this.date_taken_desc,
          this.relevance,
          this.tags,
          this.is_gallery,
          this.NSFW);
      }
    }
  }

  setTags(searchTerm: string)
  {
    this.tags = searchTerm;
    if (this.text_search !== '')
      {
        this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
          this.date_posted_desc,
          this.date_taken_asc,
          this.date_taken_desc,
          this.relevance,
          this.tags,
          this.is_gallery,
          this.NSFW);
      }
  }

  isgallery()
  {
    const maincheckbox = document.getElementById(
      'gallery',
    ) as HTMLInputElement | null;
    
    if (maincheckbox != null) {
      // If check date_posted_asc
      if(maincheckbox.checked)
      {
        this.is_gallery = true;
      }
      else
      {
        this.is_gallery = false;
      }
    }
    if (this.text_search !== '')
      {
        this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
          this.date_posted_desc,
          this.date_taken_asc,
          this.date_taken_desc,
          this.relevance,
          this.tags,
          this.is_gallery,
          this.NSFW);
      }
  }

  isnsfw()
  {
    const maincheckbox = document.getElementById(
      'nsfw',
    ) as HTMLInputElement | null;
    
    if (maincheckbox != null) {
      // If check date_posted_asc
      if(maincheckbox.checked)
      {
        this.NSFW = true;
      }
      else
      {
        this.NSFW = false;
      }
    }
    if (this.text_search !== '')
      {
        this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
          this.date_posted_desc,
          this.date_taken_asc,
          this.date_taken_desc,
          this.relevance,
          this.tags,
          this.is_gallery,
          this.NSFW);
      }
  }

  searchAll()
  {
    if (this.text_search !== '')
      {
        this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
          this.date_posted_desc,
          this.date_taken_asc,
          this.date_taken_desc,
          this.relevance,
          this.tags,
          this.is_gallery,
          this.NSFW);
      }
  }

  Date_posted_asc()
{
  const maincheckbox = document.getElementById(
    'sort_posted_asc',
  ) as HTMLInputElement | null;
  
  if (maincheckbox != null) {
    // If check date_posted_asc
    if(maincheckbox.checked)
    {
      this.date_posted_asc = true;
      this.date_posted_desc = false;
      this.date_taken_asc = false;
      this.date_taken_desc = false;
      this.relevance = false;
      const checkbox1 = document.getElementById(
      'sort_posted_desc',
      ) as HTMLInputElement | null;
      if (checkbox1 != null) {
      checkbox1.checked = false;
        }
      const checkbox_date_taken_asc = document.getElementById(
          'sort_date_taken_asc',
          ) as HTMLInputElement | null;
          if (checkbox_date_taken_asc != null) {
           checkbox_date_taken_asc.checked = false;
            }
      const checkbox_date_taken_desc = document.getElementById(
              'sort_date_taken_desc',
              ) as HTMLInputElement | null;
              if (checkbox_date_taken_desc != null) {
               checkbox_date_taken_desc.checked = false;
                }
      const checkbox_sort_relevancec = document.getElementById(
                  'sort_relevance',
                  ) as HTMLInputElement | null;
                  if (checkbox_sort_relevancec != null) {
                    checkbox_sort_relevancec.checked = false;
                    }
      
      }
      else
      {
        this.date_posted_asc = false;
      }
  }
  if (this.text_search !== '')
      {
        this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
          this.date_posted_desc,
          this.date_taken_asc,
          this.date_taken_desc,
          this.relevance,
          this.tags,
          this.is_gallery,
          this.NSFW);
      }
}

  Date_posted_desc()
{
  const maincheckbox = document.getElementById(
    'sort_posted_desc',
  ) as HTMLInputElement | null;
  
  if (maincheckbox != null) {
    // If check date_posted_desc
    if(maincheckbox.checked)
    {
      this.date_posted_asc = false;
      this.date_posted_desc = true;
      this.date_taken_asc = false;
      this.date_taken_desc = false;
      this.relevance = false;
      const checkbox1 = document.getElementById(
      'sort_posted_asc',
      ) as HTMLInputElement | null;
      if (checkbox1 != null) {
      checkbox1.checked = false;
        }
      const checkbox_date_taken_asc = document.getElementById(
          'sort_date_taken_asc',
          ) as HTMLInputElement | null;
          if (checkbox_date_taken_asc != null) {
           checkbox_date_taken_asc.checked = false;
            }
      const checkbox_date_taken_desc = document.getElementById(
              'sort_date_taken_desc',
              ) as HTMLInputElement | null;
              if (checkbox_date_taken_desc != null) {
               checkbox_date_taken_desc.checked = false;
                }
      const checkbox_sort_relevancec = document.getElementById(
                  'sort_relevance',
                  ) as HTMLInputElement | null;
                  if (checkbox_sort_relevancec != null) {
                    checkbox_sort_relevancec.checked = false;
                    }
      
      }
      else
      {
        this.date_posted_desc = false;
      }
  }
  if (this.text_search !== '')
      {
        this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
          this.date_posted_desc,
          this.date_taken_asc,
          this.date_taken_desc,
          this.relevance,
          this.tags,
          this.is_gallery,
          this.NSFW);
      }
}

date_taken_asc_fn()
{
  const maincheckbox = document.getElementById(
    'sort_date_taken_asc',
  ) as HTMLInputElement | null;
  
  if (maincheckbox != null) {
    // If check date_posted_desc
    if(maincheckbox.checked)
    {
      this.date_posted_asc = false;
      this.date_posted_desc = false;
      this.date_taken_asc = true;
      this.date_taken_desc = false;
      this.relevance = false;
      const checkbox1 = document.getElementById(
      'sort_posted_asc',
      ) as HTMLInputElement | null;
      if (checkbox1 != null) {
      checkbox1.checked = false;
        }
      const checkbox_date_taken_asc = document.getElementById(
          'sort_posted_desc',
          ) as HTMLInputElement | null;
          if (checkbox_date_taken_asc != null) {
           checkbox_date_taken_asc.checked = false;
            }
      const checkbox_date_taken_desc = document.getElementById(
              'sort_date_taken_desc',
              ) as HTMLInputElement | null;
              if (checkbox_date_taken_desc != null) {
               checkbox_date_taken_desc.checked = false;
                }
      const checkbox_sort_relevancec = document.getElementById(
                  'sort_relevance',
                  ) as HTMLInputElement | null;
                  if (checkbox_sort_relevancec != null) {
                    checkbox_sort_relevancec.checked = false;
                    }
      
      }
      else
      {
        this.date_taken_asc = false;
      }
  }
  if (this.text_search !== '')
      {
        this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
          this.date_posted_desc,
          this.date_taken_asc,
          this.date_taken_desc,
          this.relevance,
          this.tags,
          this.is_gallery,
          this.NSFW);
      }
}
date_taken_desc_fn()
{
  const maincheckbox = document.getElementById(
    'sort_date_taken_desc',
  ) as HTMLInputElement | null;
  
  if (maincheckbox != null) {
    // If check date_posted_desc
    if(maincheckbox.checked)
    {
      this.date_posted_asc = false;
      this.date_posted_desc = false;
      this.date_taken_asc = false;
      this.date_taken_desc = true;
      this.relevance = false;
      const checkbox1 = document.getElementById(
      'sort_posted_asc',
      ) as HTMLInputElement | null;
      if (checkbox1 != null) {
      checkbox1.checked = false;
        }
      const checkbox_date_taken_asc = document.getElementById(
          'sort_date_taken_asc',
          ) as HTMLInputElement | null;
          if (checkbox_date_taken_asc != null) {
           checkbox_date_taken_asc.checked = false;
            }
      const checkbox_date_taken_desc = document.getElementById(
              'sort_posted_desc',
              ) as HTMLInputElement | null;
              if (checkbox_date_taken_desc != null) {
               checkbox_date_taken_desc.checked = false;
                }
      const checkbox_sort_relevancec = document.getElementById(
                  'sort_relevance',
                  ) as HTMLInputElement | null;
                  if (checkbox_sort_relevancec != null) {
                    checkbox_sort_relevancec.checked = false;
                    }
      
      }
      else
      {
        this.date_taken_desc = false;
      }
  }
  if (this.text_search !== '')
      {
        this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
          this.date_posted_desc,
          this.date_taken_asc,
          this.date_taken_desc,
          this.relevance,
          this.tags,
          this.is_gallery,
          this.NSFW);
      }

}

relevance_fn()
{
  const maincheckbox = document.getElementById(
    'sort_relevance',
  ) as HTMLInputElement | null;
  
  if (maincheckbox != null) {
    // If check date_posted_desc
    if(maincheckbox.checked)
    {
      this.date_posted_asc = false;
      this.date_posted_desc = false;
      this.date_taken_asc = false;
      this.date_taken_desc = false;
      this.relevance = true;
      const checkbox1 = document.getElementById(
      'sort_posted_asc',
      ) as HTMLInputElement | null;
      if (checkbox1 != null) {
      checkbox1.checked = false;
        }
      const checkbox_date_taken_asc = document.getElementById(
          'sort_date_taken_asc',
          ) as HTMLInputElement | null;
          if (checkbox_date_taken_asc != null) {
           checkbox_date_taken_asc.checked = false;
            }
      const checkbox_date_taken_desc = document.getElementById(
              'sort_date_taken_desc',
              ) as HTMLInputElement | null;
              if (checkbox_date_taken_desc != null) {
               checkbox_date_taken_desc.checked = false;
                }
      const checkbox_sort_relevancec = document.getElementById(
                  'sort_posted_desc',
                  ) as HTMLInputElement | null;
                  if (checkbox_sort_relevancec != null) {
                    checkbox_sort_relevancec.checked = false;
                    }
      
      }
      else
      {
        this.relevance = false;
      }
  }
  if (this.text_search !== '')
      {
        this.dataService.searchImage_Param(this.text_search, this.minupload_date, this.maxupload_date, this.date_posted_asc,
          this.date_posted_desc,
          this.date_taken_asc,
          this.date_taken_desc,
          this.relevance,
          this.tags,
          this.is_gallery,
          this.NSFW);
      }
}


}

/*document.getElementById(id).checked = true;*/
