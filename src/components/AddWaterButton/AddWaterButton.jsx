import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import iconsPath from "../../assets/icons/sprite.svg";
import AddWaterModal from "../AddWaterModal/AddWaterModal";
import css from "./AddWaterButton.module.css";

const AddWaterButton = () => {
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
      <button className={css.button} onClick={openModal}>
        <svg className={css.icon} width="30" height="30">
          <use href={`${iconsPath}#icon-plus`} />
        </svg>
        <span className={css.text}>{t("waterMainInfo.btn")}</span>
      </button>

      {isModalOpen && <AddWaterModal onClose={closeModal} />}
    </React.Fragment>
  );
};

export default AddWaterButton;
