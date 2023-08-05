"use client";

import styles from "./search-form.module.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ClearIcon from "@mui/icons-material/Clear";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
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
  sortBy: "title" | "author" | "pubishedAt";
  sortDirection: "asc" | "dsc";
}

interface ISearchFormSettings {
  onSettingsChange: (settings: IHeaderSettings) => void;
  mode: "horizontal" | "vertical";
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

export function SearchForm(props: ISearchFormSettings) {
  const [settings, setSettings] = useState<IHeaderSettings>(
    defaultHeaderSettings()
  );

  useEffect(() => {
    props.onSettingsChange(settings);
  }, [settings]);

  function handleSortDirectionClicked() {
    const newSortDirection = settings.sortDirection === "asc" ? "dsc" : "asc";

    setSettings({ ...settings, sortDirection: newSortDirection });
  }

  function handleSortByClicked(
    event: SelectChangeEvent<"title" | "author" | "pubishedAt">
  ) {
    const value = event.target.value;

    let { sortBy } = defaultHeaderSettings();

    if (value === "title" || value === "author" || value === "pubishedAt") {
      sortBy = value;
    }

    return setSettings({ ...settings, sortBy });
  }

  function renderSortBy() {
    const arrow =
      settings.sortDirection === "asc" ? (
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
              value={settings.sortBy}
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
            value={settings.search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSettings({ ...settings, search: event.target.value });
            }}
          />
        </div>
        <IconButton
          size="small"
          onClick={() => setSettings(defaultHeaderSettings())}
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
          value={settings.from}
          onChange={(newValue) => setSettings({ ...settings, from: newValue })}
        />
        <DateTimePicker
          label="To"
          slotProps={{ textField: { size: "small" } }}
          value={settings.to}
          onChange={(newValue) => setSettings({ ...settings, to: newValue })}
        />
        {renderSortBy()}
      </div>
    </div>
  );
}
