import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-management-nav',
  templateUrl: './management-nav.component.html',
  styleUrls: ['./management-nav.component.css']
})
export class ManagementNavComponent {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  faTimes = faTimes;

  constructor(private breakpointObserver: BreakpointObserver) { }

}
