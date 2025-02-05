// import React from 'react'
import css from "./WaterModal.module.css";
import { WaterForm } from "../WaterForm/WaterForm.jsx";

export const WaterModal = ({ title, subtitle, onSave, initialData }) => {
  return (
    <div className={css.container}>
      <div className={css.titles}>
        <h2 className={css.title}>{title}</h2>
        <h3 className={css.subtitle}>{subtitle}</h3>
      </div>
      <WaterForm
        onSave={onSave}
        initialData={initialData}
        className={css.waterForm}
      />
    </div>
  );
};
