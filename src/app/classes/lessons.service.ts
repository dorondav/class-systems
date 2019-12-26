import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Lesson } from './lesson.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  lessons: Lesson[] = [];
  private lessonUpdated = new Subject<Lesson[]>();
  constructor(private http: HttpClient, private router: Router) { }


  getLessons(lessonsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${lessonsPerPage}&page=${currentPage}`;
    return this.http.get<{ message: string, lessons: any, maxLessons: number }>('http://localhost:3000/api/lessons' + queryParams)
      .pipe(map(lessonData => {
        return {
          lessons: lessonData.lessons.map(lesson => {
            return {
              id: lesson._id,
              title: lesson.title,
              content: lesson.content,
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
      content,
      location,
      startDate,
      endDate,
      hoursStart,
      hoursEnd,
      price,
      numberOfSessions
    };
    this.http.post<{ message: string, lesson: Lesson, lessonId: string }>('http://localhost:3000/api/lessons', lesson)
      .subscribe(responseData => {
        const id = responseData.lessonId;
        lesson.id = id;
        this.lessons.push(lesson);
        this.lessonUpdated.next([...this.lessons]);
        this.router.navigate(['/classes']);
      });
    // const priceStr = price.toString();
    // const numberOfSessionsStr = numberOfSessions.toString();


    // lessonData.append('title', title);
    // lessonData.append('content', content);
    // lessonData.append('startDate', startDate);
    // lessonData.append('endDate', endDate);
    // lessonData.append('hoursStart', hoursStart);
    // lessonData.append('hoursEnd', hoursEnd);
    // lessonData.append('location', location);
    // lessonData.append('price', priceStr);
    // lessonData.append('numberOfSessions', numberOfSessionsStr);
  }

  getLesson(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      location: string;
      startDate: string;
      endDate: string;
      hoursStart: string;
      hoursEnd: string;
      price: number;
      numberOfSessions: number;
    }>('http://localhost:3000/api/lessons/' + id);
  }

  updateLesson(
    id: string,
    title: string,
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
      content,
      location,
      startDate,
      endDate,
      hoursStart,
      hoursEnd,
      price,
      numberOfSessions
    };
    this.http.put('http://localhost:3000/api/lessons/' + id, lesson)
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
    return this.http.delete('http://localhost:3000/api/lessons/' + lessonID)
      .subscribe(res => {
        // const updatedLessons = this.lessons.filter(lesson => lesson.id !== lessonID);
        // this.lessons = updatedLessons;
        // this.lessonUpdated.next([...this.lessons]);
        this.router.navigate(['/classes']);

      });
  }
}
