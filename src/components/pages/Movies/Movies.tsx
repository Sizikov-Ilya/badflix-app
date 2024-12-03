import { Link, Stack } from "@mui/material";
import useMoviesQuery from "../../../app/hooks/useMoviesQuery";
import BearCarousel, { BearSlideImage } from "bear-react-carousel";
import { Link as RouterLink } from "react-router-dom";
import ErrorMessage from "../../ui/ErrorMessage";
import MoviesSkeleton from "./MoviesSkeleton";
export interface Country {
  country: string;
}

export interface Genre {
  genre: string;
}
export interface dataType {
  kinopoiskId: number;
  imdbId?: string;
  nameRu: string;
  nameEn: string;
  nameOriginal?: string;
  countries: Country[];
  genres: Genre[];
  ratingKinopoisk?: number;
  ratingImdb?: number;
  year: number;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl?: string;
  logoUrl?: string;
  description: string;
  ratingAgeLimits?: string;
}

export default function Movies() {
  const {
    isLoading,
    hasError,
    responseBest,
    responseFilms,
    responsePopular,
    responseSerials,
    responseCartoons,
  } = useMoviesQuery();

  if (isLoading) return <MoviesSkeleton />;

  if (hasError) return <ErrorMessage />;

  const serializeDataForCarousel = (data: dataType[]) => {
    return data.map((row) => (
      <RouterLink key={row.imdbId} to={`/movie/${row.kinopoiskId}`}>
        <BearSlideImage imageUrl={row.posterUrlPreview} />
      </RouterLink>
    ));
  };

  const carouselArr = [
    {
      title: "Популярные фильмы",
      url: "/popular",
      data: serializeDataForCarousel(responsePopular.data.items),
    },
    {
      title: "Лучшие фильмы",
      url: "/best",
      data: serializeDataForCarousel(responseBest.data.items),
    },
    {
      title: "Фильмы",
      url: "/films",
      data: serializeDataForCarousel(responseFilms.data.items),
    },
    {
      title: "Сериалы",
      url: "/serials",
      data: serializeDataForCarousel(responseSerials.data.items),
    },
    {
      title: "Мультфильмы",
      url: "/cartoons",
      data: serializeDataForCarousel(responseCartoons.data.items),
    },
  ];

  return (
    <>
      {carouselArr.map((carousel) => (
        <Stack key={carousel.title}>
          <Link
            sx={{ mb: 2, mt: 2 }}
            variant="h4"
            component={RouterLink}
            to={carousel.url}
          >
            {carousel.title}
          </Link>
          <BearCarousel
            data={carousel.data}
            slidesPerView={1}
            slidesPerGroup={1}
            isEnableNavButton
            isEnableLoop
            autoPlayTime={3000}
            isEnableAutoPlay
            breakpoints={{
              375: {
                autoPlayTime: 0,
              },
              768: {
                slidesPerView: 5,
              },
            }}
          />
        </Stack>
      ))}
    </>
  );
}
