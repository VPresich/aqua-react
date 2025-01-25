import css from "./Page.module.css";

export const Page = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};
