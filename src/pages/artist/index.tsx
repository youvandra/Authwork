import {
  Box,
  Center,
  createStyles,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ArtistCard from "../../components/pages/artist/ArtistCard";
import { trpc } from "../../utils/trpc";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/artist-banner.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    display: "grid",
    placeItems: "center",
    color: "white",
  },
}));

export default function Artist() {
  const { classes } = useStyles();
  const { data, isInitialLoading } = trpc.artist.getArtists.useQuery();
  if (isInitialLoading)
    return (
      <Box>
        <Box py={155} className={classes.banner}>
          <Box sx={{ textAlign: "center" }}>
            <Title size={48}>Artists</Title>

            <Text>Showing a list of talented artists all over the world</Text>
          </Box>
        </Box>
        <Center my={96}>
          <Loader />
        </Center>
      </Box>
    );

  if (data)
    return (
      <Box>
        <Box py={155} className={classes.banner}>
          <Box sx={{ textAlign: "center" }}>
            <Title size={48}>Artists</Title>

            <Text>Showing a list of talented artists all over the world</Text>
          </Box>
        </Box>

        <Title px={"xl"} my={"xl"} size={36} order={2}>
          <span style={{ color: "#C4811C" }}>Artist</span> List
        </Title>
        <Stack mt={32} spacing={48} mb={96} px={"xl"}>
          {data.map((artist) => (
            <ArtistCard key={artist.id} data={artist} />
          ))}
        </Stack>
      </Box>
    );
}
