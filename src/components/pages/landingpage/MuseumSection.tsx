import { Carousel } from "@mantine/carousel";
import {
  Box,
  Center,
  createStyles,
  Group,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { trpc } from "../../../utils/trpc";
import CustomCarousel from "./CustomCarousel";
import MuseumCard from "./MuseumCard";

const useStyles = createStyles((t) => ({
  container: { position: "relative" },
  filter: {
    position: "absolute",
    alignSelf: "center",
  },
}));

export default function MuseumSection() {
  const { data, isInitialLoading } = trpc.museumRouter.getAll.useQuery();
  return (
    <Box my={96} px={"xl"}>
      <Group position="apart">
        <Title my={"xl"} size={36} order={2}>
          <span style={{ color: "#C4811C" }}>Museums</span>
        </Title>
        <Text
          sx={{ color: "#C4811C" }}
          component={NextLink}
          href="/museums"
          variant="link"
        >
          See All
        </Text>
      </Group>
      {isInitialLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <CustomCarousel>
          {data &&
            data.map(({ id, address, name, mainImage }) => (
              <Carousel.Slide key={id}>
                <MuseumCard
                  key={id}
                  id={id}
                  name={name}
                  location={address}
                  image={mainImage}
                />
              </Carousel.Slide>
            ))}
        </CustomCarousel>
      )}
    </Box>
  );
}
