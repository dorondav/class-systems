import { Component, OnInit } from '@angular/core';
import { LessonsService } from './lessons.service';
import { Lesson } from './lesson.model';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  lessons: Lesson[] = [];
  // lessonsPerPage = 16;
  currentPage = 1;
  totalLessons = 0;
  lessonsPerPage = 10;
  lessonsSizeOptions = [1, 2, 5, 10];
  private lessonSub: Subscription;
  constructor(private lessonsService: LessonsService) {

  }
  ngOnInit() {
    this.lessonsService.getLessons(this.lessonsPerPage, this.currentPage)
      .subscribe(lessonData => {
        this.lessons = lessonData.lessons;
        this.totalLessons = this.lessons.length;

      });
  }
  onChangedPage(pageData: PageEvent) {
    // this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.lessonsPerPage = pageData.pageSize;
    this.lessonsService.getLessons(this.lessonsPerPage, this.currentPage);
  }

}
