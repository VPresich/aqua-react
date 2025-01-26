import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import css from "./SharedLayout.module.css";

export const SharedLayout = () => {
  return (
    <div className={css.layout}>
      <AppBar />
      <main className={css.main}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        <Toaster position="top-right" reverseOrder={false} />
      </main>
    </div>
  );
};
