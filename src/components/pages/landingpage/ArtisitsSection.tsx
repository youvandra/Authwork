import { Carousel } from "@mantine/carousel";
import { Box, Center, createStyles, Loader, Title } from "@mantine/core";
import { trpc } from "../../../utils/trpc";
import ArtistCard from "./ArtistCard";
import CustomCarousel from "./CustomCarousel";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/artists-section-banner.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    position: "relative",
    color: "white",
  },
}));

export default function ArtisitsSection() {
  const { classes } = useStyles();
  const { data, isInitialLoading } = trpc.artist.getArtists.useQuery();
  return (
    <Box px={"xl"} py={96} className={classes.banner}>
      <Center mb={72}>
        <Title>
          Find the <span style={{ color: "#C4811C" }}>Artist</span>
        </Title>
      </Center>
      {isInitialLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <CustomCarousel>
          {data &&
            data.map(({ user, id }, i) => (
              <Carousel.Slide key={i}>
                <ArtistCard
                  image={user.image}
                  name={user.name}
                  id={id}
                  bgImage="https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                />
              </Carousel.Slide>
            ))}
        </CustomCarousel>
      )}
    </Box>
  );
}