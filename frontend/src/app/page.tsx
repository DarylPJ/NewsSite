"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { NewsCard } from "@/components/news-card";

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

  if (!data.length) {
    return <main>Loading...!</main>;
  }

  return <main className={styles["main"]}>{renderArticles(data)}</main>;
}

function renderArticles(articles: IArticle[]) {
  return (
    <div className={styles["page-container"]}>
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
    </div>
  );
}
