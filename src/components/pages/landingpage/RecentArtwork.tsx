import { Carousel } from "@mantine/carousel";
import {
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { getAllNFTs } from "../../../utils/getAllNFTs";
import NFTExploreCard, { NFT } from "../../nft/NFTExploreCard";
import RecentArtworkCarousel from "./CustomCarousel";

const useStyles = createStyles((t) => ({
  container: { position: "relative" },
  filter: {
    position: "absolute",
    alignSelf: "center",
    [t.fn.smallerThan("md")]: {
      marginLeft: 16,
      marginRight: 16,
    },
  },
  filterContainer: {
    [t.fn.smallerThan("md")]: {
      flexDirection: "column",
      gap: 16,
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

export default function RecentArtwork() {
  const { classes } = useStyles();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    getAllNFTs()
      .then((n) => {
        setNfts(n);
      })
      .catch(() => {
        showNotification({
          message: "there was a problem fetching the NFTs",
          color: "red",
        });
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);
  return (
    <Box my={96} px={"xl"}>
      <Center>
        <Paper
          mx={"auto"}
          radius={"lg"}
          p="md"
          shadow={"xl"}
          mt={-48 - 128}
          className={classes.filter}
        >
          <Group className={classes.filterContainer} spacing={72}>
            <Title order={2}>
              <span style={{ color: "#C4811C" }}>Art</span> by categories
            </Title>
            <Group position={"center"}>
              <Button radius={"md"} compact variant="outline">
                Paintings
              </Button>
              <Button radius={"md"} compact variant="outline">
                Photographs
              </Button>
              <Button radius={"md"} compact variant="outline">
                Sculptures
              </Button>
            </Group>
          </Group>
        </Paper>
      </Center>
      <Group position="apart">
        <Title my={"xl"} size={36} order={2}>
          <span style={{ color: "#C4811C" }}>Latest</span> Artworks
        </Title>
        <Text
          sx={{ color: "#C4811C" }}
          component={NextLink}
          href="/explore"
          variant="link"
        >
          See All
        </Text>
      </Group>
      {isFetching ? (
        <Center mt={"xl"}>
          <Loader />
        </Center>
      ) : (
        <RecentArtworkCarousel>
          {nfts.reverse().map((nft, i) => (
            <Carousel.Slide key={i}>
              <NFTExploreCard {...nft} />
            </Carousel.Slide>
          ))}
        </RecentArtworkCarousel>
      )}
    </Box>
  );
}
