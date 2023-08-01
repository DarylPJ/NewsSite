"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(): Promise<void> {
    const result = await fetch("/api");

    const text = await result.text();
    setData(text);
  }

  if (!data) {
    return <main>Loading...!</main>;
  }

  return <main className={styles["main"]}>{data}</main>;
}
