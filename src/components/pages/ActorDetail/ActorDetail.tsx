import { useParams } from "react-router-dom";
import { useGetStaffByIdQuery } from "../../../services/kinopoiskApi";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ErrorMessage from "../../ui/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Movie } from "../../ui/MoviesList/MoviesList";
import { Link } from "react-router-dom";

export default function ActorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetStaffByIdQuery(id);

  if (isLoading)
    return (
      <Box display={"flex"} justifyContent={"center"} margin={"auto"}>
        <CircularProgress size={"8rem"} />
      </Box>
    );

  if (error) return <ErrorMessage />;

  return (
    <>
      <Grid container spacing={4} pt={1}>
        <Grid size={{ xs: 12, md: 4 }}>
          <img
            src={data.posterUrl}
            style={{ width: "100%" }}
            alt={data.nameRu}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Stack flexDirection={"row"}>
            <Button
              color="primary"
              onClick={() => navigate(-1)}
              startIcon={<ArrowBack />}
            ></Button>
            <Stack flexDirection={"column"}>
              <Typography variant="h5">{data.nameRu}</Typography>
              <Typography>{data.nameEn}</Typography>
            </Stack>
          </Stack>
          <Typography gutterBottom variant="h5">
            Об актёре
          </Typography>
          <Grid container>
            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>Карьера</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>{data.profession}</Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>Рост</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>{data.growth}</Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>Дата рождения</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>
                {data.birthday} ({data.age} лет)
              </Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>Всего фильмов</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>{data.films.length}</Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>Факты</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              {data.facts.map((fact: string[], index: number) => (
                <Typography gutterBottom key={fact.toString()}>
                  {index + 1}.{fact}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h5">Фильмы</Typography>
        </Grid>
      </Grid>
      <Stack>
        {data.films
          .filter(
            (film: Movie, index: number, self: Movie[]) =>
              index === self.findIndex((e: Movie) => e.filmId === film.filmId)
          )
          .map((film: Movie, index: number) => (
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              key={film.filmId}
            >
              <Typography>{index + 1}</Typography>
              <MuiLink component={Link} to={`/movie/${film.filmId}`}>
                {film.nameRu ? film.nameRu : film.nameEn}
              </MuiLink>
              <Typography>{film.rating ? film.rating : "-"}</Typography>
            </Stack>
          ))}
      </Stack>
    </>
  );
}
