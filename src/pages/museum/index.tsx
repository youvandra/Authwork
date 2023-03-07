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
import MuseumCard from "../../components/pages/museum/MuseumCard";
import { trpc } from "../../utils/trpc";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/artists-section-banner.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    display: "grid",
    placeItems: "center",
    color: "white",
  },
}));

export default function Museum() {
  const { classes } = useStyles();
  const { data, isInitialLoading } = trpc.museumRouter.getAll.useQuery();
  if (isInitialLoading)
    return (
      <Box>
        <Box py={155} className={classes.banner}>
          <Box sx={{ textAlign: "center" }}>
            <Title size={48}>Museums</Title>

            <Text>
              Showing a list of museums that own various magnificent art
              collections made by very talented artists
            </Text>
          </Box>
        </Box>
        <Center py={196}>
          <Loader />
        </Center>
      </Box>
    );
  if (data)
    return (
      <Box>
        <Box py={155} className={classes.banner}>
          <Box sx={{ textAlign: "center" }}>
            <Title size={48}>Museums</Title>

            <Text>
              Showing a list of museums that own various magnificent art
              collections made by very talented artists
            </Text>
          </Box>
        </Box>

        <Title px={"xl"} my={"xl"} size={36} order={2}>
          <span style={{ color: "#C4811C" }}>Museums</span> List
        </Title>
        <Stack mt={32} spacing={48} mb={96} px={"xl"}>
          {data.map((data) => (
            <MuseumCard key={data.id} data={data} />
          ))}
        </Stack>
      </Box>
    );
}
