import {
  Avatar,
  Box,
  createStyles,
  Group,
  Image,
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
  museumSection: {
    [t.fn.smallerThan("sm")]: {
      alignSelf: "center",
      width: "100%",
      maxWidth: "9000px",
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

export default function MuseumCard({ data }: Props) {
  const { classes } = useStyles();
  return (
    <Group py={"xl"} noWrap align={"stretch"} className={classes.container}>
      <MuseumSection data={data} />
      <ArtworkSection data={data} />
    </Group>
  );
}

function MuseumSection({ data }: Props) {
  const { classes } = useStyles();
  return (
    <Stack className={classes.museumSection} align={"center"}>
      <Image src={data.mainImage} height={250} width={"100%"} radius="md" />
      <Text size={"xl"} align="center" weight={600}>
        {data.name}
      </Text>
      <Text align="center">{data.address}</Text>

      <Text variant="link" component={NextLink} href={`/museum/${data.id}`}>
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
        <span style={{ color: "#C4811C" }}>Recent</span> Collections
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
  data: inferProcedureOutput<AppRouter["museumRouter"]["getById"]>;
}
