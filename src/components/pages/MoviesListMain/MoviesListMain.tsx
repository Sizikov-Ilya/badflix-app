import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom/";
import { Button, Stack, Typography } from "@mui/material";
import MoviesList from "../../ui/MoviesList";
import { ArrowBack } from "@mui/icons-material";
import ErrorMessage from "../../ui/ErrorMessage";

import { MOVIE_LISTS } from "../../../constants";
import {
  useGetFilmsQuery,
  useGetGenresAndCounriesQuery,
} from "../../../services/kinopoiskApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import SelectMovies from "../../ui/SelectMovies";
import MoviesListMainSkeleton from "./MoviesListMainSkeleton";

export default function MoviesListMain() {
  const location = useLocation();
  const { countries, order, year, genreId } = useSelector(
    (state: RootState) => state.currentQuery
  );
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const movieType = MOVIE_LISTS.find((el) => el.url === location.pathname);

  const myGenreId = movieType?.url === "/cartoons" ? "18" : genreId;

  const responseFilms = useGetFilmsQuery({
    type: movieType?.value,
    page,
    countries,
    order,
    year,
    genreId: myGenreId,
  });

  const responseGenresAndCountries = useGetGenresAndCounriesQuery({
    type: movieType?.value,
  });

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (responseFilms.error || responseGenresAndCountries.error)
    return <ErrorMessage />;
  if (responseFilms.isLoading || responseGenresAndCountries.isLoading)
    return <MoviesListMainSkeleton />;

  return (
    <>
      <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}></Button>
        <Typography variant="h4">{movieType?.title}</Typography>
      </Stack>
      <SelectMovies
        countriesList={responseGenresAndCountries.data.countries}
        genresList={responseGenresAndCountries.data.genres}
      />
      <MoviesList
        movies={responseFilms.data.items}
        totalPages={responseFilms.data.totalPages}
        countries={countries}
        order={order}
        year={year}
        genreId={genreId}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
