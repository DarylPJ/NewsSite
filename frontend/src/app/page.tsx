"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import _debounce from "lodash.debounce";
import styles from "./page.module.css";
import { NewsCard } from "@/components/news-card";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, IconButton, InputLabel, MenuItem } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
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

interface IHeaderSettings {
  search: string;
  from: Date | null;
  to: Date | null;
  sortBy: "title" | "author" | "pubishedAt";
  sortDirection: "asc" | "dsc";
}

function defaultHeaderSettings(): IHeaderSettings {
  return {
    sortBy: "pubishedAt",
    sortDirection: "dsc",
    search: "",
    from: null,
    to: null,
  };
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
  const [filters, setFilters] = useState<IHeaderSettings>(
    defaultHeaderSettings()
  );
  const filtersRef = useRef(filters);

  useEffect(() => {
    filtersRef.current = filters;
    debounceFetchData();
  }, [filters]);

  const debounceFetchData = useCallback(_debounce(fetchData, 500), []);

  async function fetchData(): Promise<void> {
    const currentFilters = filtersRef.current;

    const queryParameters = [];

    let key: keyof typeof currentFilters;

    for (key in currentFilters) {
      if (!Object.prototype.hasOwnProperty.call(currentFilters, key)) {
        continue;
      }

      const value = currentFilters[key];

      if (!value) {
        continue;
      }

      queryParameters.push(`${key}=${value}`);
    }

    const result = await fetch(`/api/news?${queryParameters.join("&")}`);

    const text = (await result.json()) as IArticle[];
    setData(text);
  }

  function handleSortDirectionClicked() {
    const newSortDirection = filters.sortDirection === "asc" ? "dsc" : "asc";

    setFilters({ ...filters, sortDirection: newSortDirection });
  }

  function handleSortByClicked(
    event: SelectChangeEvent<"title" | "author" | "pubishedAt">
  ) {
    const value = event.target.value;

    let { sortBy } = defaultHeaderSettings();

    if (value === "title" || value === "author" || value === "pubishedAt") {
      sortBy = value;
    }

    return setFilters({ ...filters, sortBy });
  }

  function renderSortBy() {
    const arrow =
      filters.sortDirection === "asc" ? (
        <ArrowUpwardIcon />
      ) : (
        <ArrowDownwardIcon />
      );

    return (
      <div className={`${styles["flex-item"]} ${styles["flex-container"]}`}>
        <div className={`${styles["flex-item"]} ${styles["flex-container"]}`}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy}
              label="Sort By"
              onChange={handleSortByClicked}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="author">Author</MenuItem>
              <MenuItem value="pubishedAt">PubishedAt</MenuItem>
            </Select>
          </FormControl>
        </div>
        <IconButton size="small" onClick={handleSortDirectionClicked}>
          {arrow}
        </IconButton>
      </div>
    );
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
              value={filters.search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFilters({ ...filters, search: event.target.value });
              }}
            />
          </div>
          <IconButton
            size="small"
            onClick={() => setFilters(defaultHeaderSettings())}
          >
            <ClearIcon />
          </IconButton>
        </div>
        <div className={styles["header-container"]}>
          <DateTimePicker
            label="From"
            slotProps={{ textField: { size: "small" } }}
            value={filters.from}
            onChange={(newValue) => setFilters({ ...filters, from: newValue })}
          />
          <DateTimePicker
            label="To"
            slotProps={{ textField: { size: "small" } }}
            value={filters.to}
            onChange={(newValue) => setFilters({ ...filters, to: newValue })}
          />
          {renderSortBy()}
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
