import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Страница не найдена
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        На главную
      </Button>
    </Box>
  );
};

export default NotFoundPage;
