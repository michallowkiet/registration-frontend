import { FormEvent, useEffect, useState } from "react";
import { getRequest, postRequest } from "../../API";
import { CityType } from "../../types/cityType";
import { CourseType } from "../../types/courseType";
import { FormType, FormErrorType } from "../../types/formType";
import { isEmpty, emptyMsg } from "../../utils/validation";
import style from "./Form.module.css";

const defaultFormData: FormType = {
  name: "",
  cities: "",
  courses: "",
};

export const Form = ({ getAllEvents }: { getAllEvents: () => void }) => {
  const [cities, setCities] = useState<Array<CityType>>([]);
  const [courses, setCourses] = useState<Array<CourseType>>([]);
  const [formData, setFormData] = useState<FormType>(defaultFormData);

  const [formErrors, setFormErrors] = useState<FormErrorType | null>(null);

  const inputChangeHandler = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.currentTarget;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const getAllCities = async () => {
    const data = await getRequest("cities");
    setCities(data);
  };

  const getAllCourses = async () => {
    const data = await getRequest("courses");
    setCourses(data);
  };

  const createEntry = async () => {
    await postRequest("events", formData);
    getAllEvents();
  };

  const validateForm = () => {
    const { name, cities, courses } = formData;
    let errors: FormErrorType = {
      isNameError: false,
      isCitiesError: false,
      isCoursesError: false,
    };

    errors.isNameError = isEmpty(name);
    errors.isCitiesError = isEmpty(cities);
    errors.isCoursesError = isEmpty(courses);

    setFormErrors(errors);
  };

  const formHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateForm();

    if (formErrors === null) {
      return;
    }

    console.log(formErrors);

    if (!Object.values(formErrors).some((val) => val)) {
      createEntry();
      setFormData(defaultFormData);
      event.currentTarget.reset();
      setFormErrors(null);
    }
  };

  useEffect(() => {
    getAllCities();
    getAllCourses();
  }, []);

  useEffect(() => {
    if (formErrors !== null) {
      validateForm();
    }
  }, [formData]);

  return (
    <div className={style.login}>
      <form className={style.form} onSubmit={formHandler}>
        <div className={style.formGroup}>
          <label htmlFor="name">Imię i Nazwisko</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={inputChangeHandler}
          />
          {formErrors?.isNameError && (
            <div className={style.error}>{emptyMsg()}</div>
          )}
        </div>
        <div className={style.formGroup}>
          <label htmlFor="city">Miasto</label>
          <select name="cities" id="city" onChange={inputChangeHandler}>
            <option value=""> ---- </option>
            {cities.map((city, index) => {
              return (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              );
            })}
          </select>
          {formErrors?.isCitiesError && (
            <div className={style.error}>{emptyMsg()}</div>
          )}
        </div>
        <div className={style.formGroup}>
          <label htmlFor="course">Kurs</label>
          <select name="courses" id="course" onChange={inputChangeHandler}>
            <option value=""> ---- </option>
            {courses.map((course, index) => {
              return (
                <option key={course._id} value={course.name}>
                  {course.name}
                </option>
              );
            })}
          </select>
          {formErrors?.isCoursesError && (
            <div className={style.error}>{emptyMsg()}</div>
          )}
        </div>
        <div className={style.formGroup}>
          <button className={style.btn} type="submit">
            Zapisz
          </button>
        </div>
      </form>
    </div>
  );
};
