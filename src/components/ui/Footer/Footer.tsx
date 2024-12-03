import { Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: { sm: "row" },
        justifyContent: { sm: "space-between" },
        alignItems: { sm: "center" },
        marginTop: "auto",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} &laquo;badflix&raquo; 18+ <br />
        Данный сайт создан исключительно для учебных целей. <br />
        Все права защищеныыыыыы.
      </Typography>

      <Typography variant="h4" color="primary.main">
        badflix
      </Typography>
    </Stack>
  );
}
