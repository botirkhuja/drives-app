import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  navigateByUrl(url: string) {
    console.log(this.router);
    this.router.navigateByUrl(url, { relativeTo: this.route });
  }
}
