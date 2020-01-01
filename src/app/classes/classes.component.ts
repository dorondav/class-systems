import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { Lesson } from './lesson.model';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs/internal/Subscription';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  lessons: Lesson[] = [];
  isLoading = false;
  faTrash = faTrash;
  currentPage = 1;
  lessonsPerPage = 10;
  totalLessons = 0;
  lessonsSizeOptions = [1, 2, 5, 10];
  private lessonSub: Subscription;
  constructor(private lessonsService: LessonsService) {
  }
  ngOnInit() {
    this.isLoading = true;
    this.getAllLessons();
  }
  onChangedPage(pageData: PageEvent) {
    // this.isLoading = true;

    this.currentPage = pageData.pageIndex + 1;
    this.lessonsPerPage = pageData.pageSize;
    this.lessonsService.getLessons(this.lessonsPerPage, this.currentPage);
    this.isLoading = false;

  }
  onDelete(lessonId: string) {
    this.lessonsService.deleteLesson(lessonId)
      .subscribe(() => {
        this.getAllLessons();
        this.isLoading = false;
      });
  }
  getAllLessons() {
    this.lessonsService.getLessons(this.lessonsPerPage, this.currentPage)
      .subscribe(lessonData => {
        this.lessons = lessonData.lessons;
        this.totalLessons = this.lessons.length;
        this.isLoading = false;
      });
  }
}
