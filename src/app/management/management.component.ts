import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { Lesson } from '../classes/lesson.model';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  currentPage = 1;
  lessonsPerPage = 10;
  lessons: Lesson[] = [];
  isLoading = false;

  constructor(private lessonsService: LessonsService) { }

  ngOnInit() {
    this.isLoading = true;

    this.getAllLessons();
  }
  getAllLessons() {
    this.lessonsService.getLessons(this.lessonsPerPage, this.currentPage)
      .subscribe(lessonData => {
        this.lessons = lessonData.lessons;
        this.isLoading = false;
      });
  }
}
