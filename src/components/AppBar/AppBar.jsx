import Logo from "../Logo/Logo";
import css from "./AppBar.module.css";

export default function AppBar() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
      </div>
    </header>
  );
}
