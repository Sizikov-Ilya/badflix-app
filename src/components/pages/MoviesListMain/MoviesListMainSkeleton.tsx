import { Skeleton, Stack, useMediaQuery } from "@mui/material";

export default function MoviesListMainSkeleton() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="32px"
        width="200px"
        sx={{ mb: 2, mt: 2 }}
      />
      <Stack
        sx={{
          flexDirection: { sm: "column", md: "row" },
          gap: 1,
          mt: 2,
          mb: 2,
        }}
      >
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? "100%" : "25%"}
          height="40px"
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? "100%" : "25%"}
          height="40px"
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? "100%" : "25%"}
          height="40px"
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? "100%" : "25%"}
          height="40px"
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={"132px"}
          height="40px"
        />
      </Stack>

      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <Stack key={index} flexDirection="column">
              <Skeleton
                animation="wave"
                variant="rectangular"
                height="322px"
                width="215px"
              />
              <Skeleton animation="wave" variant="text" width="120px" />
              <Skeleton animation="wave" variant="text" width="120px" />
            </Stack>
          ))}
      </Stack>
    </>
  );
}
