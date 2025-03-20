import React from "react";
import Navbar from "../navbar/Navbar";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function NavigationLayout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
