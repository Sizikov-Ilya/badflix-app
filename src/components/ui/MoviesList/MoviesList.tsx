import { Pagination, Stack } from "@mui/material";

import MovieCard from "../MovieCard/MovieCard";

export interface Movie {
  filmId?: number;
  kinopoiskId: number;
  imdbId?: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  countries: Country[];
  genres: Genre[];
  ratingKinopoisk: number;
  ratingImdb: number;
  year: number;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl?: string;
  logoUrl?: string;
  description: string;
  ratingAgeLimits?: string;
  rating: number;
}

export interface Country {
  country: string;
}

export interface Genre {
  genre: string;
}

interface MoviesListProps {
  movies: Movie[];
  totalPages: number;
  page: number;
  setPage: (arg: number) => void;
  countries: string;
  order: string;
  year: string;
  genreId: string;
}

export default function MoviesList({
  movies,
  totalPages,
  page,
  setPage,
}: MoviesListProps) {
  return (
    <>
      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {movies?.map((movie: Movie) => (
          <MovieCard key={movie.kinopoiskId} movie={movie} />
        ))}
      </Stack>
      <Stack alignItems={"center"}>
        <Pagination
          count={totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Stack>
    </>
  );
}
