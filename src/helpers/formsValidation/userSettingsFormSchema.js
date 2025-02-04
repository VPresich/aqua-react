import * as Yup from "yup";

export const userSettingsFormSchema = (t) =>
  Yup.object({
    gender: Yup.string()
      .oneOf(
        ["male", "female"],
        t("validationSettings.gender.oneOf", {
          defaultValue: "Gender must be either 'male' or 'female'",
        })
      )
      .default("female")
      .typeError(
        t("validationSettings.gender.typeError", {
          defaultValue: "Gender must be a string",
        })
      )
      .notRequired(),

    name: Yup.string()
      .min(
        2,
        t("validationSettings.name.min", {
          defaultValue: "Name must be at least 2 characters long.",
        })
      )
      .max(
        50,
        t("validationSettings.name.max", {
          defaultValue: "Name cannot exceed 50 characters.",
        })
      )
      .typeError(
        t("validationSettings.name.typeError", {
          defaultValue: "Name must be a string",
        })
      )
      .transform((value, originalValue) => {
        return originalValue === "" ? undefined : value;
      })
      .notRequired()
      .trim(),

    email: Yup.string()
      .email(
        t("validationSettings.email.email", {
          defaultValue: "Please enter a valid email address.",
        })
      )
      .typeError(
        t("validationSettings.email.typeError", {
          defaultValue: "Email must be a string",
        })
      )
      .required(
        t("validationSettings.email.required", {
          defaultValue: "Email is required.",
        })
      )
      .trim(),

    sportTime: Yup.number()
      .typeError(
        t("validationSettings.activityTime.typeError", {
          defaultValue: "Sport time must be a number",
        })
      )
      .min(
        0,
        t("validationSettings.activityTime.min", {
          defaultValue: "Sport time cannot be negative.",
        })
      )
      .max(
        24,
        t("validationSettings.activityTime.max", {
          defaultValue: "Sport time cannot exceed 24 hours.",
        })
      )
      .default(0)
      .transform((value, originalValue) =>
        originalValue === "" || originalValue == null ? 0 : value
      )
      .notRequired(),

    weight: Yup.number()
      .typeError(
        t("validationSettings.weight.typeError", {
          defaultValue: "Weight must be a number",
        })
      )
      .min(
        0,
        t("validationSettings.weight.min", {
          defaultValue: "Weight cannot be negative.",
        })
      )
      .max(
        350,
        t("validationSettings.weight.max", {
          defaultValue: "Weight cannot exceed 350 kg.",
        })
      )
      .default(0)
      .transform((value, originalValue) =>
        originalValue === "" || originalValue == null ? 0 : value
      )
      .notRequired(),

    waterNorm: Yup.number()
      .typeError(
        t("validationSettings.desiredVolume.typeError", {
          defaultValue: "Water intake must be a number",
        })
      )
      .min(
        0.05,
        t("validationSettings.desiredVolume.min", {
          defaultValue: "Water intake must be at least 0.05 L.",
        })
      )
      .max(
        5,
        t("validationSettings.desiredVolume.max", {
          defaultValue: "Water intake cannot exceed 5 L.",
        })
      )
      .required(
        t("validationSettings.desiredVolume.required", {
          defaultValue: "Water intake is required.",
        })
      )
      .transform((value, originalValue) => {
        if (typeof originalValue === "string") {
          const formattedValue = originalValue
            .replace(/,/g, ".")
            .replace(/[^0-9.]/g, "");
          return parseFloat(formattedValue) || undefined;
        }
        return value;
      }),
  });
