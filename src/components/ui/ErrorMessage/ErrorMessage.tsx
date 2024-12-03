import { Box, Typography } from "@mui/material";

export default function ErrorMessage() {
  return (
    <Box
      display="flex"
      margin="auto"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h6">
        Произошла ошибка - попробуйте перезагрузить страницу
      </Typography>
    </Box>
  );
}
