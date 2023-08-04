"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { NewsCard } from "@/components/news-card";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { FormControl, IconButton, InputLabel, MenuItem } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ClearIcon from "@mui/icons-material/Clear";

interface ISource {
  Id: string | null;
  Name: string;
}

interface IArticle {
  title: string;
  author: string | null;
  source: ISource | null;
  publishedAt: string;
  url: string;
  urlToImage: string;
  description: string;
}

function renderArticles(articles: IArticle[]) {
  return (
    <div className={styles["grid-container"]}>
      {articles.map((article, index) => (
        <div key={`item-${index}`} className={styles["grid-item"]}>
          <NewsCard
            key={`news-{index}`}
            title={article.title}
            sourceName={article.source?.Name ?? ""}
            description={article.description}
            image={article.urlToImage}
            url={article.url}
            published={article.publishedAt}
          />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState<IArticle[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(): Promise<void> {
    const result = await fetch("/api");

    const text = (await result.json()) as IArticle[];
    setData(text);
  }

  function renderHeader() {
    return (
      <div className={styles["header"]}>
        <div className={styles["flex-container"]}>
          <div className={styles["flex-item"]}>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              fullWidth
              size="small"
            />
          </div>
          <IconButton size="small">
            <ClearIcon />
          </IconButton>
        </div>
        <div className={styles["flex-container"]}>
          <DateTimePicker
            label="From"
            slotProps={{ textField: { size: "small" } }}
          />
          <DateTimePicker
            label="To"
            slotProps={{ textField: { size: "small" } }}
          />
          <div className={styles["flex-item"]}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select value={"pubishedAt"} label="Sort By">
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="pubishedAt">PubishedAt</MenuItem>
              </Select>
            </FormControl>
          </div>
          <IconButton size="small">
            <ArrowUpwardIcon />
          </IconButton>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return <main>Loading...!</main>;
  }

  return (
    <main className={styles["main"]}>
      {renderHeader()}
      {renderArticles(data)}
    </main>
  );
}
