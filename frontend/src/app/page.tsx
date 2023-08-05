"use client";

import styles from "./page.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import _debounce from "lodash.debounce";
import { NewsCard } from "@/components/news-card";
import {
  IHeaderSettings,
  SearchForm,
  defaultHeaderSettings,
} from "@/components/search-form";
import {
  Button,
  CircularProgress,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
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

function selectQueryParameters(filters: IHeaderSettings): string[] {
  const queryParameters = [];

  let key: keyof typeof filters;

  for (key in filters) {
    if (!Object.prototype.hasOwnProperty.call(filters, key)) {
      continue;
    }

    const value = filters[key];

    if (!value) {
      continue;
    }

    queryParameters.push(`${key}=${value}`);
  }

  return queryParameters;
}

export default function Home() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [filters, setFilters] = useState<IHeaderSettings>(
    defaultHeaderSettings()
  );
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  const filtersRef = useRef(filters);
  const setFirstLoadRef = useRef(setFirstLoad);
  const setShowSpinnerRef = useRef(setShowSpinner);

  useEffect(() => {
    filtersRef.current = filters;
    debounceFetchData();
  }, [filters]);

  const debounceFetchData = useCallback(_debounce(fetchData, 500), []);

  async function fetchData(): Promise<void> {
    const currentFilters = filtersRef.current;

    const queryParameters = currentFilters
      ? selectQueryParameters(currentFilters)
      : [];

    const result = await fetch(`/api/news?${queryParameters.join("&")}`);

    const text = (await result.json()) as IArticle[];
    setArticles(text);
    setFirstLoadRef.current(false);
    setShowSpinnerRef.current(false);
  }

  const isSmallScreen = useMediaQuery("(max-width:700px)");

  if (isFirstLoad) {
    return (
      <main className={styles["main"]}>
        <h2 className={styles["loading-title"]}>Loading...</h2>
        <LinearProgress />
      </main>
    );
  }

  function renderArticles() {
    if (!articles.length) {
      return (
        <div className={styles["no-results-container"]}>
          <h2>No results found</h2>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setShowSpinner(true);
                setFilters(defaultHeaderSettings());
              }}
              endIcon={<ClearIcon />}
            >
              Clear Filters
            </Button>
          </div>
          <div>{showSpinner ? <CircularProgress /> : ""}</div>
        </div>
      );
    }

    return articles.map((article, index) => (
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
    ));
  }

  return (
    <main className={styles["main"]}>
      <SearchForm
        settings={filters}
        onSettingsChange={(settings: IHeaderSettings) => setFilters(settings)}
        mode={isSmallScreen ? "vertical" : "horizontal"}
      />
      <div className={styles["grid-container"]}>{renderArticles()}</div>
    </main>
  );
}
