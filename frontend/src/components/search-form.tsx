import styles from "./search-form.module.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ClearIcon from "@mui/icons-material/Clear";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";

export interface IHeaderSettings {
  search: string;
  from: Date | null;
  to: Date | null;
  sortBy: "title" | "author" | "publishedAt";
  sortDirection: "asc" | "dsc";
}

interface ISearchFormSettings {
  settings: IHeaderSettings;
  onSettingsChange: (settings: IHeaderSettings) => void;
  mode: "horizontal" | "vertical";
}

export function defaultHeaderSettings(): IHeaderSettings {
  return {
    sortBy: "publishedAt",
    sortDirection: "dsc",
    search: "",
    from: null,
    to: null,
  };
}

export function SearchForm(props: ISearchFormSettings) {
  function handleSortDirectionClicked() {
    const newSortDirection =
      props.settings.sortDirection === "asc" ? "dsc" : "asc";

    props.onSettingsChange({
      ...props.settings,
      sortDirection: newSortDirection,
    });
  }

  function handleSortByClicked(
    event: SelectChangeEvent<"title" | "author" | "publishedAt">
  ) {
    const value = event.target.value;

    let { sortBy } = defaultHeaderSettings();

    if (value === "title" || value === "author" || value === "publishedAt") {
      sortBy = value;
    }

    return props.onSettingsChange({ ...props.settings, sortBy });
  }

  function renderSortBy() {
    const arrow =
      props.settings.sortDirection === "asc" ? (
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
              value={props.settings.sortBy}
              label="Sort By"
              onChange={handleSortByClicked}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="author">Author</MenuItem>
              <MenuItem value="publishedAt">published Date</MenuItem>
            </Select>
          </FormControl>
        </div>
        <IconButton size="small" onClick={handleSortDirectionClicked}>
          {arrow}
        </IconButton>
      </div>
    );
  }

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
            value={props.settings.search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              props.onSettingsChange({
                ...props.settings,
                search: event.target.value,
              });
            }}
          />
        </div>
        <IconButton
          size="small"
          onClick={() => props.onSettingsChange(defaultHeaderSettings())}
        >
          <ClearIcon />
        </IconButton>
      </div>
      <div
        className={`${styles["flex-container"]} ${
          props.mode === "vertical" ? styles["vertical"] : ""
        }`}
      >
        <DateTimePicker
          label="From"
          slotProps={{ textField: { size: "small" } }}
          value={props.settings.from}
          onChange={(newValue) =>
            props.onSettingsChange({ ...props.settings, from: newValue })
          }
        />
        <DateTimePicker
          label="To"
          slotProps={{ textField: { size: "small" } }}
          value={props.settings.to}
          onChange={(newValue) =>
            props.onSettingsChange({ ...props.settings, to: newValue })
          }
        />
        {renderSortBy()}
      </div>
    </div>
  );
}
