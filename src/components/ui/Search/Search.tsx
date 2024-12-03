import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useGetFilmsQuery } from "../../../services/kinopoiskApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useEffect, useState } from "react";
import { setSearchQuery } from "../../../features/searchQuerySlice";
import React from "react";
import { useNavigate } from "react-router-dom";

const movieTypes: Record<
  "FILM" | "TV_SERIES" | "TV_SHOW" | "MINI_SERIES",
  string
> = {
  FILM: "Фильм",
  TV_SERIES: "Сериал",
  TV_SHOW: "ТВ-шоу",
  MINI_SERIES: "Мини-сериал",
};

// Интерфейс для фильма
interface Movie {
  nameRu: string;
  type: keyof typeof movieTypes;
  year: number;
  kinopoiskId: number; // Уникальный ID для фильма
}

export default function Search() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { genreId, countries, order, year, keyword, type, page } = useSelector(
    (state: RootState) => state.searchQuery
  );

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: input }));
    }, 500);
    return () => clearTimeout(setTimeoutId);
  }, [dispatch, input]);

  // Используем типизацию для запроса данных
  const { data, isFetching } = useGetFilmsQuery({
    genreId,
    countries,
    order,
    year,
    keyword,
    type,
    page,
  });

  return (
    <Autocomplete
      sx={{
        width: 300,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none",
          },
        },
      }}
      freeSolo
      // Указываем тип для опций Autocomplete
      options={data ? (data.items as Movie[]) : []}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option.nameRu} - ${movieTypes[option.type]} ${option.year}`
      }
      onChange={(_, value) => {
        if (typeof value !== "string" && value?.kinopoiskId) {
          navigate(`/movie/${value.kinopoiskId}`);
        }
      }}
      onInputChange={(_, value) => {
        setInput(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Поиск"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isFetching ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
