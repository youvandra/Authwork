import {
  Box,
  createStyles,
  Group,
  Text,
  Image,
  Title,
  SimpleGrid,
  Stack,
  Center,
  Loader,
} from "@mantine/core";
import { inferProcedureOutput } from "@trpc/server";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaAddressBook, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

import { MdArrowBack } from "react-icons/md";
import { NFT } from "../../components/EventCard";

import NFTExploreCard from "../../components/nft/NFTExploreCard";
import { AppRouter } from "../../server/trpc/router/_app";
import { getAllNFTsById } from "../../utils/getAllNFTsById";
import { trpc } from "../../utils/trpc";

const useStyles = createStyles((t) => ({
  container: {
    backgroundColor: "#111",
    width: "100%",
    color: "white",
  },
  imageContainer: {
    width: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "repeat(8, 1fr)",
    gap: 16,
    [t.fn.smallerThan("md")]: { display: "flex", flexDirection: "column" },
  },
  img1: {
    gridArea: "1 / 1 / 9 / 6",
  },
  img2: {
    gridArea: " 5 / 6 / 9 / 9",
  },
  img3: {
    gridArea: "1 / 6 / 5 / 9",
  },
  overviewConatiner: {
    display: "flex",
    flexDirection: "row",
    gap: t.spacing.xl,
    [t.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
    },
  },
}));

export default function Museum() {
  const { classes } = useStyles();
  const router = useRouter();
  const id = String(router.query.id);
  const { data, isInitialLoading } = trpc.museumRouter.getById.useQuery({ id });

  if (isInitialLoading)
    return (
      <Box className={classes.container}>
        <Center py={196}>
          <Loader size={"xl"} />
        </Center>
      </Box>
    );

  if (data)
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
          <Title mt={"xl"}>{data.name}</Title>
          <Box className={classes.grid} mt={"xl"}>
            <Image
              height={420}
              className={classes.img1}
              radius={"md"}
              src={data.mainImage}
            />

            <Image
              className={classes.img2}
              height={210 - 8}
              radius={"md"}
              src={data.image1}
            />
            <Image
              className={classes.img3}
              height={210 - 8}
              radius={"md"}
              src={data.image2}
            />
          </Box>
        </Box>
        <Overview data={data} />
        <RecommendedEvents data={data} />
      </>
    );
  return (
    <Box className={classes.container}>
      <Center py={196}>
        <Text weight={600} size={32} color={"red"}>
          There was a problem
        </Text>
      </Center>
    </Box>
  );
}

function Overview({ data }: Props) {
  const { classes } = useStyles();
  return (
    <Box pt={64} px={"xl"}>
      <Title size={36} order={2}>
        <span style={{ color: "#C4811C" }}>Overview</span>
      </Title>
      <Box mt={"xl"} className={classes.overviewConatiner}>
        <Stack>
          <Text mt={"md"} weight={500} size={"lg"}>
            {data.description}
          </Text>
          <Group noWrap mt={48}>
            <FaMapMarkerAlt color="#111" size={24} />{" "}
            <Text color="#111" weight={600} size={"lg"}>
              {data.address}
            </Text>
          </Group>
          <Group noWrap>
            <FaAddressBook color="#111" size={24} />{" "}
            <Text color="#111" weight={600} size={"lg"}>
              {data.phone}
            </Text>
          </Group>
          <Group noWrap>
            <FaGlobe color="#111" size={24} />{" "}
            <Text color="#111" weight={600} size={"lg"}>
              {data.website}
            </Text>
          </Group>
        </Stack>
      </Box>
    </Box>
  );
}

function RecommendedEvents({ data }: Props) {
  const [nfts, setNfts] = useState<NFT[]>([]);
  useEffect(() => {
    async function updateNFTs() {
      setNfts(await getAllNFTsById(data.tokenIds));
    }
    updateNFTs();
  }, []);
  return (
    <Box py={64} px={"xl"}>
      <Title size={36} order={2}>
        <span style={{ color: "#C4811C" }}>Recommended</span> Collections
      </Title>
      <SimpleGrid
        mt={"xl"}
        cols={4}
        breakpoints={[
          { maxWidth: "lg", cols: 3 },
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {nfts.map((nft) => (
          <NFTExploreCard key={nft.tokenId} {...nft} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

interface Props {
  data: inferProcedureOutput<AppRouter["museumRouter"]["getById"]>;
}
