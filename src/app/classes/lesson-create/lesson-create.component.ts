import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})
export class LessonCreateComponent implements OnInit {
  form: FormGroup;
  mode = 'create-lesson';
  isLoading = false;
  constructor(private lessonService: LessonsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      location: new FormControl(null, { validators: [Validators.required] }),
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

    this.lessonService.createLesson(
      this.form.value.title,
      this.form.value.content,
      this.form.value.location,
      this.form.value.startDate,
      this.form.value.endDate,
      this.form.value.hoursStart,
      this.form.value.hoursEnd,
      this.form.value.price,
      this.form.value.numLessons
    );

    this.form.reset();
  }
}
