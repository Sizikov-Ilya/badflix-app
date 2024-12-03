import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { resetQuery, selectQuery } from "../../../features/currentQuerySlice";
import { RootState } from "../../../app/store";

interface CountriesList {
  id: number;
  country: string;
}
interface GenresList {
  id: number;
  genre: string;
}

interface SelectMoviesProps {
  countriesList: CountriesList[];
  genresList: GenresList[];
}

export default function SelectMovies({
  countriesList,
  genresList,
}: SelectMoviesProps) {
  const ordersList = [
    {
      title: "По рейтингу",
      value: "RATING",
    },
    {
      title: "По оценкам",
      value: "NUM_VOTE",
    },
  ];

  const dispatch = useDispatch();

  const { countries, order, year, genreId } = useSelector(
    (state: RootState) => state.currentQuery
  );

  const yearsList = new Array(60).fill(null).map((_, index) => ({
    title: new Date().getFullYear() - index,
    value: new Date().getFullYear() - index,
  }));

  return (
    <Stack
      sx={{ flexDirection: { sm: "column", md: "row" }, gap: 1, mt: 2, mb: 2 }}
    >
      <FormControl fullWidth size="small">
        <InputLabel>Сортировка</InputLabel>
        <Select
          label="Orders"
          value={order}
          onChange={(e) => dispatch(selectQuery({ order: e.target.value }))}
        >
          {ordersList.map((order) => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Страна</InputLabel>
        <Select
          label="Countries"
          value={countries}
          onChange={(e) => dispatch(selectQuery({ countries: e.target.value }))}
        >
          {countriesList.map((country: CountriesList) => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Жанр</InputLabel>
        <Select
          label="Genres"
          value={genreId}
          onChange={(e) => dispatch(selectQuery({ genreId: e.target.value }))}
        >
          {genresList.map((genre: GenresList) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Год</InputLabel>
        <Select
          label="Year"
          value={year}
          onChange={(e) => dispatch(selectQuery({ year: e.target.value }))}
        >
          {yearsList.map((year) => (
            <MenuItem key={year.value} value={year.value}>
              {year.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Button
          onClick={() => dispatch(resetQuery())}
          variant="outlined"
          startIcon={<CloseIcon />}
        >
          Сбосить
        </Button>
      </Box>
    </Stack>
  );
}
