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
  const [errors, setErrors] = useState<FormType>({});

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

  const validateForm = (): boolean => {
    const { name, cities, courses } = formData;
    let errorsMsg = { name: "", cities: "", courses: "" };

    errorsMsg.name = isEmpty(name) ? emptyMsg() : "";
    errorsMsg.cities = isEmpty(cities) ? emptyMsg() : "";
    errorsMsg.courses = isEmpty(courses) ? emptyMsg() : "";

    setErrors(errorsMsg);

    return Object.values(errorsMsg).some((error) => error !== "");
  };

  const formHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isError = validateForm();

    console.log(isError);

    setIsError(isError);

    if (!isError && Object.keys(errors).length !== 0) {
      createEntry();
      setFormData(defaultFormData);
      event.currentTarget.reset();
    }
  };

  useEffect(() => {
    getAllCities();
    getAllCourses();
  }, []);

  useEffect(() => {
    if (isError) {
      const isError = validateForm();
      setIsError(isError);
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
          {isError && <div className={style.error}>{errors?.name}</div>}
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
          {isError && <div className={style.error}>{errors?.cities}</div>}
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
          {isError && <div className={style.error}>{errors?.courses}</div>}
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
