import { useParams } from "react-router-dom";
import {
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from "../../../services/kinopoiskApi";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import ErrorMessage from "../../ui/ErrorMessage";
import { ArrowBack, Movie as MovieIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Language from "@mui/icons-material/Language";
import MovieCard from "../../ui/MovieCard/MovieCard";
import { useEffect } from "react";
import { Movie } from "../../ui/MoviesList/MoviesList";
import VideoPlayer from "../../ui/VideoPlayer";
import { Link } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const responseFilm = useGetFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (
    responseFilm.isLoading ||
    responseSequelsAndPrequels.isLoading ||
    responseStaff.isLoading
  ) {
    return (
      <Box display={"flex"} justifyContent={"center"} margin={"auto"}>
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (responseFilm.isError || responseStaff.isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid size={{ md: 4, sm: 12 }}>
          <img
            src={responseFilm.data?.posterUrl}
            alt={responseFilm.data?.nameRu}
            width="100%"
          />
        </Grid>
        <Grid size={{ md: 6, sm: 12 }}>
          <Grid container mb={2}>
            <Grid size={{ md: 2, sm: 12 }}>
              <Button
                size="large"
                onClick={() => navigate(-1)}
                startIcon={<ArrowBack />}
              />
            </Grid>
            <Grid size={4} alignContent={"center"}>
              <Typography variant="h5">{responseFilm.data?.nameRu}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid size={6}>
              <Typography>Год</Typography>
            </Grid>
            <Grid size={6}>
              <Typography gutterBottom>{responseFilm.data?.year}</Typography>
            </Grid>

            <Grid size={6}>
              <Typography>Страна</Typography>
            </Grid>
            <Grid size={6}>
              {responseFilm.data?.countries.map(
                ({ country }: { country: string }, index: number) => (
                  <Typography gutterBottom key={`${country}-${index}`}>
                    {country}
                  </Typography>
                )
              )}
            </Grid>

            <Grid size={6}>
              <Typography>Жанры</Typography>
            </Grid>
            <Grid size={6}>
              {responseFilm.data?.genres.map(
                ({ genre }: { genre: string }, index: number) => (
                  <Typography gutterBottom key={`${genre}-${index}`}>
                    {genre}
                  </Typography>
                )
              )}
            </Grid>

            <Grid size={6}>
              <Typography>Режиссеры</Typography>
            </Grid>
            <Grid size={6}>
              {responseStaff.data
                ?.filter(
                  (el: { professionText: string }) =>
                    el.professionText === "Режиссеры"
                )
                .slice(0, 5)
                .map(({ nameRu }: { nameRu: string }, index: number) => (
                  <Typography gutterBottom key={`${nameRu}-${index}`}>
                    {nameRu}
                  </Typography>
                ))}
            </Grid>

            <Grid size={6}>
              <Typography>Время фильма </Typography>
            </Grid>
            <Grid size={6}>
              <Typography gutterBottom>
                {responseFilm.data?.filmLength} мин
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography gutterBottom>Описание </Typography>
            </Grid>
            <Grid size={12}>
              <Typography gutterBottom>
                {responseFilm.data?.description
                  ? responseFilm.data?.description
                  : "Нет описания"}{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ md: 2, sm: 12 }}>
          <Typography variant="h6">В главных ролях</Typography>
          {responseStaff.data
            .filter(
              (el: { professionText: string }) => el.professionText === "Актеры"
            )
            .slice(0, 10)
            .map(({ nameRu, staffId }: { nameRu: string; staffId: number }) => (
              <div key={nameRu}>
                <MuiLink component={Link} to={`/actor/${staffId}`} gutterBottom>
                  {nameRu}
                </MuiLink>
              </div>
            ))}
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Grid size={12} justifyContent={"center"} display={"flex"} mt={4}>
          <ButtonGroup variant="outlined" size="small">
            <Button
              endIcon={<Language />}
              href={responseFilm.data.webUrl}
              target="_blank"
            >
              Кинопоиск
            </Button>
            <Button
              endIcon={<MovieIcon />}
              href={`https://www.imdb.com/title/${responseFilm.data.imdbId}`}
              target="_blank"
            >
              IMDB
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid
          container
          spacing={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Grid size={12} mr={"auto"}>
            <Typography textAlign={"center"} variant="h5">
              Смотреть онлайн
            </Typography>
            <VideoPlayer />
          </Grid>
        </Grid>
      </Grid>

      <Stack alignItems={"center"}>
        <Typography gutterBottom variant="h5">
          Сиквелы и приквелы
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          sx={{ gap: 2 }}
        >
          {responseSequelsAndPrequels?.data?.map((el: Movie, index: number) => (
            <MovieCard key={`movie-${index}`} movie={el} />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
