import React, { useState } from "react";
import iconsPath from "../../assets/icons/sprite.svg";
import AddWaterModal from "../AddWaterModal/AddWaterModal";
import { useTranslation } from "react-i18next";
import css from "./CreateWaterBtn.module.css";

const CreateWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className={css.btn}
        onClick={openModal}
        aria-label="Add water"
      >
        <span className={css.iconContainer}>
          <svg className={css.icon}>
            <use href={`${iconsPath}#icon-plus`} />
          </svg>
        </span>
        <span className={css.text}>{t("modals.addEdit.btn")}</span>
      </button>
      {isModalOpen && <AddWaterModal onClose={closeModal} />}
    </React.Fragment>
  );
};

export default CreateWaterBtn;
