import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../classes/lessons.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(private lessonService: LessonsService) { }

  ngOnInit() {
  }

}
