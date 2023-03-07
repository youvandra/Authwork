import {
  Avatar,
  Box,
  createStyles,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { inferProcedureOutput } from "@trpc/server";
import React, { useEffect, useState } from "react";
import { IoMdColorPalette } from "react-icons/io";
import { AppRouter } from "../../../server/trpc/router/_app";
import { getAllNFTsById } from "../../../utils/getAllNFTsById";
import { NFT } from "../../EventCard";
import NFTCard from "../../nft/NFTCard";

const useStyles = createStyles((t) => ({
  container: {
    borderRadius: 8,
    border: "1px solid #DDAB46",
    padding: 16,
    [t.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },
  artistSection: {
    [t.fn.smallerThan("sm")]: {
      alignSelf: "center",
    },

    maxWidth: 300,
    height: "100%",
  },
  artwokrsSection: {
    flexGrow: 1,
    [t.fn.largerThan("sm")]: {
      paddingLeft: 16,
      borderLeft: "1px solid #DDAB46",
    },
  },
}));

export default function ArtistCard({ data }: Props) {
  const { classes } = useStyles();
  return (
    <Group py={"xl"} noWrap align={"stretch"} className={classes.container}>
      <ArtistSection data={data} />
      <ArtworkSection data={data} />
    </Group>
  );
}

function ArtistSection({ data }: Props) {
  const { classes } = useStyles();
  return (
    <Stack className={classes.artistSection} align={"center"}>
      <Avatar src={data.user.image} size={180} radius={999} />
      <Text size={"xl"} weight={600}>
        {data.user.name}
      </Text>
      <Text align="center">{data.description}</Text>
      <Group mt={"xl"} sx={{ color: "#111" }} spacing={"xs"} align={"center"}>
        <IoMdColorPalette size={24} />
        <Text weight={500}>{data.tokenIds.length} Artworks</Text>
      </Group>
      <Text variant="link" component={NextLink} href={`/artist/${data.id}`}>
        See Details
      </Text>
    </Stack>
  );
}

function ArtworkSection({ data }: Props) {
  const { classes } = useStyles();
  const [nfts, setNfts] = useState<NFT[]>([]);
  useEffect(() => {
    async function updateNFTs() {
      setNfts(await getAllNFTsById(data.tokenIds));
    }
    updateNFTs();
  }, []);
  return (
    <Box className={classes.artwokrsSection}>
      <Title order={3}>
        <span style={{ color: "#C4811C" }}>Recent</span> Artworks
      </Title>
      <SimpleGrid
        spacing={"xl"}
        mt={"xl"}
        breakpoints={[
          { maxWidth: "lg", cols: 2 },
          { maxWidth: "md", cols: 1 },
        ]}
        sx={{ width: "100%" }}
        cols={3}
      >
        {nfts.map((nft) => (
          <NFTCard key={nft.tokenId} {...nft} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

interface Props {
  data: inferProcedureOutput<AppRouter["artist"]["getArtists"]>[number];
}
