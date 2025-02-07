import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import { FaRegClock, FaTimes } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimePickerInput.css";
import css from "./DateTimePickerInput.module.css";

function DateTimePickerInput({ name, setValue, value }, ref) {
  const [selectedTime, setSelectedTime] = useState(
    value ? new Date(`1970-01-01T${value}:00`) : new Date()
  );
  const [isOpen, setIsOpen] = useState(false);
  const datepickerRef = useRef(null);

  const {
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const handleTimeChange = (date) => {
    if (!date) {
      setSelectedTime(null);
      setValue(name, "");
      clearErrors(name);
      return;
    }

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    setSelectedTime(date);
    setValue(name, formattedTime);
    clearErrors(name);
  };

  const handleIconClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleClickOutside = (e) => {
    if (datepickerRef.current && !datepickerRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={clsx("datetimepicker__wrapper")}>
      <div ref={datepickerRef}>
        <DatePicker
          selected={selectedTime}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={1}
          open={isOpen}
          dateFormat="HH:mm"
          className={clsx("datetimepicker", { [css.error]: errors[name] })}
          wrapperClassName="datetimepicker__wrapper"
          onInputClick={handleInputClick}
          onCalendarClose={() => setIsOpen(false)}
          onCalendarOpen={() => setIsOpen(true)}
          popperPlacement="bottom-end"
        />
      </div>
      <FaRegClock className="datetimepicker__icon" onClick={handleIconClick} />
      {errors[name] ? (
        <FaTimes
          className="datetimepicker__clear-icon"
          onClick={() => handleTimeChange("")}
        />
      ) : null}

      {errors[name] && (
        <span className={clsx(css.message, css.error)}>
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

export default React.forwardRef(DateTimePickerInput);
