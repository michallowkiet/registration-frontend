import { FormEvent, useEffect, useState } from "react";
import { getRequest, postRequest } from "../../API";
import { CityType } from "../../types/cityType";
import { CourseType } from "../../types/courseType";
import { FormType } from "../../types/formType";
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
  const [isError, setIsError] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormType>(defaultFormData);

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
    let errorsMsg = { name: "", cities: "", courses: "" };

    errorsMsg.name = isEmpty(name) ? emptyMsg() : "";
    errorsMsg.cities = isEmpty(cities) ? emptyMsg() : "";
    errorsMsg.courses = isEmpty(courses) ? emptyMsg() : "";

    if (
      errorsMsg.name.length > 0 ||
      errorsMsg.cities.length > 0 ||
      errorsMsg.courses.length > 0
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const formHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm();

    if (!isError) {
      createEntry();
      setFormData(defaultFormData);
      event.currentTarget.reset();
    }
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
            <option value=""> ---- </option>
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
            <option value=""> ---- </option>
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
