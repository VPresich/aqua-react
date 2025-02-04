import { useForm, Controller } from "react-hook-form";
import sprite from "../../assets/icons/sprite.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { waterFormSchema } from "../../helpers/formsValidation/waterFormSchema";
import css from "./WaterForm.module.css";

export const WaterForm = ({ onSave, initialData = {} }) => {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      inputField: initialData?.volume ?? 50,
      buttonField: initialData?.volume ?? 50,
      time: initialData?.time ?? getCurrentTime(),
    },
    resolver: yupResolver(waterFormSchema()),
  });

  const onSubmit = (data) => {
    onSave(data);
  };

  const { t } = useTranslation();

  return (
    <div className={css.waterFormDiv}>
      <div className={css.waterForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div>
            <label className={css.formLabelBtn}>
              {t("modals.addEdit.volume")}
            </label>
            <div className={css.formBtn}>
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
                  <use href={`${sprite}#icon-minus1`}></use>
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
                  <use href={`${sprite}#icon-plus1`}></use>
                </svg>
              </button>
            </div>
            {errors.buttonField && (
              <span className={css.error}>{errors.buttonField.message}</span>
            )}
          </div>

          <div className={css.time}>
            <label className={css.formLabelTime}>
              {t("modals.addEdit.time")}
            </label>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={css.timeField}
                  type="time"
                  style={{
                    padding: "16px 16px",
                    width: "100%",
                    height: "56px",
                    boxSizing: "border-box",
                    WebkitAppearance: "none",
                  }}
                />
              )}
            />
            {errors.time && (
              <span className={css.error}>{errors.time.message}</span>
            )}
          </div>

          <div className={css.keyboard}>
            <label className={css.formLabel}>{t("modals.addEdit.value")}</label>
            <Controller
              name="inputField"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={css.keyboardField}
                  type="text"
                  onChange={(e) => {
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
                  }}
                  value={field.value}
                />
              )}
            />
            {errors.inputField && (
              <span className={css.error}>{errors.inputField.message}</span>
            )}
          </div>

          <button className={css.btnSubmit} type="submit">
            {t("modals.addEdit.saveBtn")}
          </button>
        </form>
      </div>
    </div>
  );
};
