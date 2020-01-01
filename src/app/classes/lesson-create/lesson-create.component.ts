import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Lesson } from '../lesson.model';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})
export class LessonCreateComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  private mode = 'create-lesson';
  private lessonId: string;
  private lesson: Lesson;
  public programs = ['Javascript', 'Python', 'Java', '.NET'];
  imagePreview: string;

  constructor(private lessonService: LessonsService, public route: ActivatedRoute) {

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('lessonId')) {
        this.mode = 'edit-lesson';
        this.lessonId = paramMap.get('lessonId');

        this.lessonService.getLesson(this.lessonId)
          .subscribe(lessonData => {
            this.isLoading = false;
            this.lesson = {
              id: lessonData._id,
              title: lessonData.title,
              program: lessonData.program,
              content: lessonData.content,
              location: lessonData.location,
              startDate: lessonData.startDate,
              endDate: lessonData.endDate,
              hoursStart: lessonData.hoursStart,
              hoursEnd: lessonData.hoursEnd,
              price: lessonData.price,
              numberOfSessions: lessonData.numberOfSessions
            };
            this.form.patchValue({
              title: this.lesson.title,
              content: this.lesson.content,
              program: lessonData.program,
              location: this.lesson.location,
              startDate: this.lesson.startDate,
              endDate: this.lesson.endDate,
              hoursStart: this.lesson.hoursStart,
              hoursEnd: this.lesson.hoursEnd,
              price: this.lesson.price,
              numLessons: this.lesson.numberOfSessions
            });
          });
        this.isLoading = false;

      } else {
        this.mode = 'create-lesson';
        this.lessonId = null;
        this.isLoading = false;

      }
    });
    // init Form
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      location: new FormControl(null, { validators: [Validators.required] }),
      program: new FormControl(null, { validators: [Validators.required] }),
      startDate: new FormControl(null, { validators: [Validators.required] }),
      endDate: new FormControl(null, { validators: [Validators.required] }),
      hoursStart: new FormControl(null, { validators: [Validators.required] }),
      hoursEnd: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required, Validators.min(1)] }),
      numLessons: new FormControl(null, { validators: [Validators.required, Validators.min(1)] })
    });

  }

  onLessonSave() {
    if (this.form.invalid) {
      return;
    }
    // this.isLoading = true;
    if (this.mode === 'create-lesson') {
      this.lessonService.createLesson(
        this.form.value.title,
        this.form.value.content,
        this.form.value.program,
        this.form.value.location,
        this.form.value.startDate,
        this.form.value.endDate,
        this.form.value.hoursStart,
        this.form.value.hoursEnd,
        this.form.value.price,
        this.form.value.numLessons
      );
    } else {
      this.lessonService.updateLesson(
        this.lessonId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.program,
        this.form.value.location,
        this.form.value.startDate,
        this.form.value.endDate,
        this.form.value.hoursStart,
        this.form.value.hoursEnd,
        this.form.value.price,
        this.form.value.numLessons
      );
    }
    this.form.reset();
  }


}
