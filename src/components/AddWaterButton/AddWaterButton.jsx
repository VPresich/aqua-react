import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import iconsPath from "../../assets/icons/sprite.svg";
import AddWaterModal from "../AddWaterModal/AddWaterModal";
import { addWater } from "../../redux/water/waterOps";
import css from "./AddWaterButton.module.css";

const AddWaterButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleCreate = () => {
    openModal();
  };

  const handleAddWater = (volume) => {
    dispatch(addWater({ volume }));
    closeModal();
  };

  return (
    <React.Fragment>
      <button
        data-tour="step-add-card"
        className={css.button}
        onClick={handleCreate}
      >
        <svg className={css.icon} width="30" height="30">
          <use href={`${iconsPath}#icon-plus`} />
        </svg>
        <span className={css.text}>{t("waterMainInfo.btn")}</span>
      </button>

      {isModalOpen && (
        <AddWaterModal onClose={closeModal} onAdd={handleAddWater} />
      )}
    </React.Fragment>
  );
};

export default AddWaterButton;
