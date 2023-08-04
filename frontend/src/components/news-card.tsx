import styles from "./news-card.module.css";

interface INewsProps {
  title: string;
  sourceName: string;
  description: string;
  image: string;
  published: string;
  url: string;
}

export function NewsCard(props: INewsProps) {
  let dateString = "";
  const date = new Date(props.published);

  if (!isNaN(date.getTime())) {
    dateString = date.toLocaleString();
  }

  return (
    <div className={styles["container"]}>
      <img src={props.image} alt="stock image for news"></img>
      <h4 className={styles["title"]}>
        <a href={props.url} target="_blank">
          {props.title}
        </a>
      </h4>
      <div className={styles["description"]}>{props.description}</div>
      <div>{dateString}</div>
      <div>{props.sourceName}</div>
    </div>
  );
}
