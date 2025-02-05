import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getCurrentTime } from "../../helpers/getCurrentTime";
import { FaRegClock, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "./TimePickerInput.css";
import css from "./TimePickerInput.module.css";

function TimePickerInput({ name, setValue, value }, ref) {
  const [selectedTime, setSelectedTime] = useState(value || getCurrentTime());
  const {
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();

  const handleTimeChange = (time) => {
    if (!time) {
      clearErrors(name);
      setSelectedTime("");
      setValue(name, "");
      return;
    }

    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
      setError(name, { type: "manual", message: "Invalid time format" });
      return;
    }

    clearErrors(name);
    setSelectedTime(time);
    setValue(name, time);
  };

  useEffect(() => {
    setSelectedTime(value || getCurrentTime());
  }, [value]);

  return (
    <div ref={ref} className="timepicker__wrapper">
      <TimePicker
        value={selectedTime}
        onChange={handleTimeChange}
        format="HH:mm"
        clearIcon={
          errors[name] ? (
            <FaTimes
              className="timepicker__clear-icon"
              onClick={() => handleTimeChange("")}
            />
          ) : null
        }
        clockIcon={<FaRegClock className="timepicker__icon" />}
        className={clsx("timepicker", errors[name] && "red")}
      />

      {errors[name] && (
        <span className={clsx(css.message, css.error)}>
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

export default React.forwardRef(TimePickerInput);
