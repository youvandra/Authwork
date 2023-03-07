import {
  Box,
  createStyles,
  Group,
  Text,
  Image,
  Title,
  Stack,
  SimpleGrid,
  Button,
  Center,
  Loader,
} from "@mantine/core";
import { useRouter } from "next/router";

import { MdArrowBack } from "react-icons/md";
import NFTExploreCard, { NFT } from "../../components/nft/NFTExploreCard";
import ArtistCard from "../../components/pages/artwork/ArtistCard";
import Property from "../../components/pages/artwork/Property";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { getAllNFTs } from "../../utils/getAllNFTs";
import { getNFTbyId } from "../../utils/getNFTbyId";
import { buyNFT } from "../../utils/buyNFT";

const useStyles = createStyles((t) => ({
  container: {
    backgroundColor: "#111",
    width: "100%",
    color: "white",
  },
  imageContainer: {
    width: "100%",
  },
  mainConatiner: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: t.spacing.xl,
    [t.fn.smallerThan("md")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "stretch",
    },
  },
  detailsContainer: {},
}));

export default function Artwork() {
  const { classes } = useStyles();
  const router = useRouter();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const tokenId = router.query.id;
  const [nft, setNft] = useState<NFT>(null);

  useEffect(() => {
    tokenId &&
      getNFTbyId(tokenId)
        .then((n) => {
          setNft(n);
        })
        .catch(() => {
          showNotification({
            message: "there was a problem fetching the NFT",
            color: "red",
          });
        });
  }, [tokenId]);
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
    <>
      <Box px={"xl"} pb={64} className={classes.container} pt={96 + 24}>
        <Group
          onClick={() => {
            router.back();
          }}
          spacing={"xs"}
          sx={{
            color: "#DDAB46",
            cursor: "pointer",
          }}
        >
          <MdArrowBack size={24} />
          <Text variant="link">Back</Text>
        </Group>
        {!nft && (
          <Center>
            <Loader />
          </Center>
        )}
        {nft && (
          <Box className={classes.mainConatiner} mt={"xl"}>
            <Stack className={classes.imageContainer} spacing={48}>
              <Image
                alt={nft.metadata.title}
                radius={"md"}
                src={nft.metadata.image}
              />
              <ArtistCard name={nft.metadata.artist} artwokrsCount={900} />
            </Stack>
            <Stack className={classes.detailsContainer}>
              <Title>{nft.metadata.title}</Title>
              <Text>{nft.metadata.description}</Text>
              <SimpleGrid mt={"xl"} cols={2}>
                <Property label="Type" value={nft.metadata.type} />
                <Property label="Dimentions" value={nft.metadata.size} />
                <Property label="Technique" value={nft.metadata.technique} />
                <Property label="Year" value={nft.metadata.year} />
              </SimpleGrid>
              <Text mt={"xl"} size={24} weight={"bold"}>
                Price: {nft.metadata.price} FTM
              </Text>
              <Button
                onClick={() => {
                  buyNFT(nft);
                }}
                size="lg"
              >
                Buy now
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
      <Box py={64} px={"xl"}>
        <Title size={36} order={2}>
          <span style={{ color: "#C4811C" }}>Recommended</span> Artworks
        </Title>
        {isFetching ? (
          <Center mt={"xl"}>
            <Loader />
          </Center>
        ) : (
          <SimpleGrid
            breakpoints={[
              { maxWidth: "lg", cols: 3 },
              { maxWidth: "md", cols: 2 },
              { maxWidth: "xs", cols: 1 },
            ]}
            spacing={"lg"}
            mt={"xl"}
            cols={4}
          >
            {nfts.map((props, i) => (
              <NFTExploreCard {...props} key={i} />
            ))}{" "}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
}
