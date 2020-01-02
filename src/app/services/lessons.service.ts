import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

import { Router } from '@angular/router';
import { Lesson } from '../classes/lesson.model';

const BACKEND_URL = environment.apiUrl + '/lessons/';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  lessons: Lesson[] = [];
  private lessonUpdated = new Subject<Lesson[]>();
  constructor(private http: HttpClient, private router: Router) { }


  getLessons(lessonsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${lessonsPerPage}&page=${currentPage}`;
    return this.http.get<{ message: string, lessons: any, maxLessons: number }>(BACKEND_URL + queryParams)
      .pipe(map(lessonData => {
        return {
          lessons: lessonData.lessons.map(lesson => {
            return {
              id: lesson._id,
              title: lesson.title,
              content: lesson.content,
              program: lesson.program,
              startDate: lesson.startDate,
              endDate: lesson.endDate,
              hoursStart: lesson.hoursStart,
              hoursEnd: lesson.hoursEnd,
              location: lesson.location,
              price: lesson.price,
              numberOfSessions: lesson.numberOfSessions
            };
          }),
          maxLessons: lessonData.maxLessons
        };
      }));
  }

  createLesson(
    title: string,
    content: string,
    program: string,
    location: string,
    startDate: string,
    endDate: string,
    hoursStart: string,
    hoursEnd: string,
    price: number,
    numberOfSessions: number
  ) {
    const lesson: Lesson = {
      id: null,
      title,
      program,
      content,
      location,
      startDate,
      endDate,
      hoursStart,
      hoursEnd,
      price,
      numberOfSessions
    };
    this.http.post<{ message: string, lesson: Lesson, lessonId: string }>(BACKEND_URL, lesson)
      .subscribe(responseData => {
        const id = responseData.lessonId;
        lesson.id = id;
        this.lessons.push(lesson);
        this.lessonUpdated.next([...this.lessons]);
        this.router.navigate(['/classes']);
      });

  }

  getLesson(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      program: string;
      location: string;
      startDate: string;
      endDate: string;
      hoursStart: string;
      hoursEnd: string;
      price: number;
      numberOfSessions: number;
    }>(BACKEND_URL + id);
  }

  updateLesson(
    id: string,
    title: string,
    program: string,
    content: string,
    location: string,
    startDate: string,
    endDate: string,
    hoursStart: string,
    hoursEnd: string,
    price: number,
    numberOfSessions: number) {
    const lesson: Lesson = {
      id,
      title,
      program,
      content,
      location,
      startDate,
      endDate,
      hoursStart,
      hoursEnd,
      price,
      numberOfSessions
    };
    this.http.put(BACKEND_URL + id, lesson)
      .subscribe(res => {
        const updatedLessons = [...this.lessons];
        const oldLessonIndex = updatedLessons.findIndex(p => p.id === lesson.id);
        updatedLessons[oldLessonIndex] = lesson;
        this.lessons = updatedLessons;
        this.router.navigate(['/classes']);
        this.lessonUpdated.next([...this.lessons]);
      });
  }

  deleteLesson(lessonID: string) {
    return this.http.delete(BACKEND_URL + lessonID);
  }
}
