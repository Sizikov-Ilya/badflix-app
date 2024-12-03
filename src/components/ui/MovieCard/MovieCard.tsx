import { Box, Rating, Stack, Tooltip, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import styles from "./MovieCard.module.css";
import { Movie } from "../MoviesList/MoviesList";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Stack>
      <RouterLink
        to={
          movie.kinopoiskId
            ? `/movie/${movie.kinopoiskId}`
            : `/movie/${movie.filmId}`
        }
      >
        <img
          className={styles.img}
          src={movie.posterUrlPreview}
          alt={typeof movie.nameRu === "string" ? movie.nameRu : ""}
        />
      </RouterLink>
      <MuiLink
        component={RouterLink}
        to={
          movie.kinopoiskId
            ? `/movie/${movie.kinopoiskId}`
            : `/movie/${movie.filmId}`
        }
        textAlign="center"
        sx={{ width: "200px" }}
      >
        {movie.nameRu
          ? movie.nameRu.toString()
          : movie.nameEn?.toString() || ""}
      </MuiLink>

      {movie.ratingKinopoisk !== undefined &&
        movie.ratingKinopoisk !== null && (
          <Stack alignItems="center">
            <Tooltip title={`${movie.ratingKinopoisk} / 10`}>
              <Box>
                <Rating
                  precision={0.5}
                  name="read-only"
                  value={movie.ratingKinopoisk / 2}
                  readOnly
                />
              </Box>
            </Tooltip>
          </Stack>
        )}
    </Stack>
  );
}
