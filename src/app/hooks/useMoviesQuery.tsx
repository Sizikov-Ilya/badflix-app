import {
  useGetFilmsQuery,
  useGetFilmsTopQuery,
} from "../../services/kinopoiskApi";
import { TOP_LISTS } from "../../constants";

import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function useMoviesQuery() {
  const { page, order, countries, year } = useSelector(
    (state: RootState) => state.currentQuery
  );

  const responsePopular = useGetFilmsTopQuery({
    type: TOP_LISTS[0].value,
    page,
  });

  const responseBest = useGetFilmsTopQuery({
    type: TOP_LISTS[1].value,
    page,
  });

  const responseFilms = useGetFilmsQuery({
    type: "FILM",
    order,
    countries,
    genreId: "1",
    year,
    page,
  });

  const responseSerials = useGetFilmsQuery({
    type: "TV_SERIES",
    order,
    countries,
    genreId: "1",
    year,
    page,
  });

  const responseCartoons = useGetFilmsQuery({
    type: "FILM",
    order,
    countries,
    genreId: "18",
    year,
    page,
  });

  const isLoading =
    responsePopular.isFetching ||
    responseBest.isFetching ||
    responseFilms.isFetching ||
    responseSerials.isFetching ||
    responseCartoons.isFetching;

  const hasError =
    responsePopular.error ||
    responseBest.error ||
    responseFilms.error ||
    responseSerials.error ||
    responseCartoons.error;
  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons,
  };
}
