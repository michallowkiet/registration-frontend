import React, { FormEvent, useEffect, useState } from "react";
import { getRequest, postRequest } from "../../API";
import { CityType } from "../../types/cityType";
import { CourseType } from "../../types/courseType";
import { FormType } from "../../types/formType";
import style from "./Form.module.css";

export const Form = () => {
  const [cities, setCities] = useState<Array<CityType>>([]);
  const [courses, setCourses] = useState<Array<CourseType>>([]);
  const [formData, setFormData] = useState<FormType | {}>({});

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
    const data = await postRequest("events", formData);
    console.log(data);
  };

  const formHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createEntry();
    setFormData({});
  };

  useEffect(() => {
    getAllCities();
    getAllCourses();
  }, []);

  return (
    <div className={style.login}>
      <form onSubmit={formHandler}>
        <div className={style.formGroup}>
          <label htmlFor="name">Imię i Nazwisko</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={inputChangeHandler}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="city">Miasto</label>
          <select name="city" id="city" onChange={inputChangeHandler}>
            {cities.map((city, index) => {
              return (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="course">Kurs</label>
          <select name="course" id="course" onChange={inputChangeHandler}>
            {courses.map((course, index) => {
              return (
                <option key={course._id} value={course.name}>
                  {course.name}
                </option>
              );
            })}
          </select>
        </div>
        <button className={style.btn} type="submit">
          Zapisz
        </button>
      </form>
    </div>
  );
};
