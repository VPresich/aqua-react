import * as Yup from "yup";

export const waterFormSchema = () =>
  Yup.object({
    inputField: Yup.number()
      .required("This field is required")
      .min(50, "The value cannot be less than 50")
      .max(5000, "The value cannot exceed 5000"),
    buttonField: Yup.number()
      .required("This field is required")
      .min(50, "The value cannot be less than 50")
      .max(5000, "The value cannot exceed 5000"),
    time: Yup.string()
      .required("Time is required")
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
  });
