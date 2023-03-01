export interface FormType {
  name: string;
  cities: string;
  courses: string;
}

export interface FormErrorType {
  isNameError: boolean;
  isCitiesError: boolean;
  isCoursesError: boolean;
}
