import React, { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Center,
  createStyles,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IoMdColorPalette } from "react-icons/io";
import { NextLink } from "@mantine/next";
import NFTCard from "../components/nft/NFTCard";
import { NFT } from "../components/nft/NFTExploreCard";
import { getMyNFTs } from "../utils/getMyNFTs";
import { showNotification } from "@mantine/notifications";
import { trpc } from "../utils/trpc";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/profile-banner.png')",
    height: 281,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  container: {
    flexWrap: "nowrap",
    [t.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },
  detailsWrapper: {
    [t.fn.smallerThan("md")]: {
      alignSelf: "center",
    },
  },
  detailsContainer: {
    width: 300,
    [t.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
  collection: {
    flexGrow: 1,
    [t.fn.smallerThan("md")]: {
      alignSelf: "stretch",
      textAlign: "center",
    },
  },
}));

export default function Profile() {
  const { classes } = useStyles();
  const { data } = trpc.auth.getSession.useQuery();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    setIsFetching(true);
    getMyNFTs()
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
    <Box mb={96}>
      <Box className={classes.banner} />
      <Group
        className={classes.container}
        spacing={48}
        mt={24}
        align={"start"}
        px={"xl"}
      >
        <Stack className={classes.detailsWrapper} mt={-124} spacing={48}>
          <Paper p={24} radius={"lg"} shadow={"md"}>
            <Stack
              className={classes.detailsContainer}
              mb={"xl"}
              spacing={"xs"}
              align={"center"}
            >
              <Avatar radius={999} src={data?.user?.image} size={140} />
              <Title mt={"xl"} order={2} color="brand">
                {data?.user?.name}
              </Title>

              <Title color={"#111"} mt={"xl"} order={4}>
                Total Collection
              </Title>
              <Group sx={{ color: "#111" }} spacing={"xs"} align={"center"}>
                <IoMdColorPalette size={24} />
                <Text weight={500}>
                  {nfts.length} Artwork{nfts.length > 1 ? "s" : ""}
                </Text>
              </Group>
            </Stack>
          </Paper>
          <Text
            align="center"
            component={NextLink}
            href="/#"
            weight={500}
            variant="link"
            color={"brand"}
          >
            Request to Ship Your Art{" "}
          </Text>
        </Stack>

        <Stack className={classes.collection}>
          <Title color="brand" order={1}>
            My <span style={{ color: "#111" }}>collection</span>
          </Title>
          {isFetching ? (
            <Center mt={"md"}>
              <Loader />
            </Center>
          ) : (
            <SimpleGrid
              mt={"xl"}
              sx={{ width: "full" }}
              cols={3}
              breakpoints={[
                { maxWidth: "lg", cols: 2 },
                { maxWidth: "md", cols: 3 },
                { maxWidth: "sm", cols: 2 },
                { maxWidth: "xs", cols: 1 },
              ]}
            >
              {nfts.map((props, i) => (
                <NFTCard key={i} {...props} />
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Group>
    </Box>
  );
}
