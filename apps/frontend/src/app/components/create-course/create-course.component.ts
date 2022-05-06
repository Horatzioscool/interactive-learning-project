import { Course } from './../../shared/entities/course';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/entities/course';
import { AddCourseDto } from '../../shared/entities/course';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public newCourse: AddCourseDto = {
    name: '',
    description: '',
  };
}
