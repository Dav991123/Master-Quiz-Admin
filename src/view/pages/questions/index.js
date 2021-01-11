import React from 'react';
import MaterialTable from 'material-table';
import AddCourses from './addQuestions/index';
import { rootCourses } from '../../../core/firebase/base';

const Courses = () => {
  const add = () => {
    const autoId = rootCourses.push().key
    rootCourses.child(autoId).set({
      first_name: 'njk'
    });
  }
  return (
    <div>
      <AddCourses />
    </div>
  )
}
export default Courses;
