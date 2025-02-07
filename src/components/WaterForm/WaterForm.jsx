import { useForm, Controller, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import DateTimePickerInput from "../DateTimePickerInput/DateTimePickerInput";
import Input from "../Input/Input";
import { getCurrentTime } from "../../helpers/getCurrentTime";
import sprite from "../../assets/icons/sprite.svg";
import { waterFormSchema } from "../../helpers/formsValidation/waterFormSchema";
import css from "./WaterForm.module.css";

export const WaterForm = ({ onSave, initialData = {} }) => {
  const methods = useForm({
    defaultValues: {
      inputField: initialData?.volume ?? 50,
      buttonField: initialData?.volume ?? 50,
      time: initialData?.time ?? getCurrentTime(),
    },
    resolver: yupResolver(waterFormSchema()),
  });

  const { handleSubmit, control, setValue, getValues } = methods;

  const onSubmit = (data) => {
    onSave(data);
  };

  const handleInputChange = useCallback(
    (e) => {
      let newValue = e.target.value;

      if (newValue.startsWith("0") && newValue.length > 1) {
        newValue = newValue.replace(/^0+/, "");
      }

      if (!/^\d*$/.test(newValue)) {
        return;
      }

      const numericValue = Math.min(
        Math.max(parseInt(newValue || "0", 10), 0),
        5000
      );

      setValue("inputField", numericValue);
      setValue("buttonField", numericValue);
    },
    [setValue]
  );

  const { t } = useTranslation();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.buttonsTimeContainer}>
          <div className={css.buttonsControls}>
            <label className={css.label}>{t("modals.addEdit.volume")}</label>
            <div className={css.btnsContainer}>
              <button
                className={css.btn}
                type="button"
                onClick={() => {
                  const newValue = Math.max(50, getValues("buttonField") - 50);
                  setValue("buttonField", newValue);
                  setValue("inputField", newValue);
                }}
              >
                <svg className={css.btnIcon}>
                  <use href={`${sprite}#icon-minus`}></use>
                </svg>
              </button>
              <Controller
                name="buttonField"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={css.btnField}
                    type="text"
                    disabled
                    value={`${field.value} ${t("modals.addEdit.ml")}`}
                    style={{ backgroundColor: "#323f47" }}
                  />
                )}
              />
              <button
                className={css.btn}
                type="button"
                onClick={() => {
                  const newValue = Math.min(
                    5000,
                    getValues("buttonField") + 50
                  );
                  setValue("buttonField", newValue);
                  setValue("inputField", newValue);
                }}
              >
                <svg className={css.btnIcon}>
                  <use href={`${sprite}#icon-plus`}></use>
                </svg>
              </button>
            </div>
          </div>

          <div className={css.timePicker}>
            <label className={css.label}>{t("modals.addEdit.time")}</label>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <DateTimePickerInput
                  {...field}
                  setValue={setValue}
                  value={field.value}
                />
              )}
            />
          </div>
        </div>
        <Controller
          name="inputField"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("modals.addEdit.value")}
              type="text"
              classInput={css.keyboardField}
              onChange={(e) => handleInputChange(e)}
              value={field.value}
            />
          )}
        />
        <button className={css.btnSubmit} type="submit">
          {t("modals.addEdit.saveBtn")}
        </button>
      </form>
    </FormProvider>
  );
};
