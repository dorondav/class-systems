import { Component, OnInit, OnDestroy } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { Lesson } from '../classes/lesson.model';
import { AuthService } from '../auth/authService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit, OnDestroy {
  currentPage = 1;
  lessonsPerPage = 10;
  lessons: Lesson[] = [];
  isLoading = false;
  userRole: string;
  username: string;
  userPhone: string;
  userEmail: string;
  private authStatusSub: Subscription;

  constructor(private lessonsService: LessonsService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.userRole = this.authService.getUserRole();
    this.username = this.authService.getUsername();
    this.getAllLessons();
  }
  getAllLessons() {
    this.lessonsService.getLessons(this.lessonsPerPage, this.currentPage)
      .subscribe(lessonData => {
        this.lessons = lessonData.lessons;
        this.isLoading = false;
      });
  }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
