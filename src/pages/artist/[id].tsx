import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoMdColorPalette } from "react-icons/io";
import { NFT } from "../../components/EventCard";
import NFTCard from "../../components/nft/NFTCard";
import { getAllNFTsById } from "../../utils/getAllNFTsById";
import { trpc } from "../../utils/trpc";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/profile-banner.png')",
    height: 281,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  detailsWrapper: {
    position: "absolute",
    alignSelf: "center",
    [t.fn.smallerThan("md")]: {
      flexDirection: "column",
      marginTop: -100,
      width: "100%",
      position: "relative",
      marginLeft: 16,
      marginRight: 16,
    },
  },
  detailsContainer: {
    width: 700,
    [t.fn.smallerThan("md")]: {
      width: "100%",
      flexDirection: "column",
    },
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: t.spacing.xl,
    marginTop: 196,
    [t.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
      marginTop: 72,
    },
  },
  awardsContainer: {
    width: 300,
    border: "1px solid #C4811C",
    borderRadius: 16,
    padding: t.spacing.md,
    [t.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export default function ArtistPage() {
  const { classes } = useStyles();
  const router = useRouter();
  const { data, isInitialLoading } = trpc.artist.getById.useQuery({
    //@ts-ignore
    id: router.query.id,
  });

  if (isInitialLoading)
    return (
      <Box mb={96}>
        <Box className={classes.banner} />
        <Center mt={48}>
          <Loader />
        </Center>
      </Box>
    );
  if (!data) {
    showNotification({ message: "There was a problem", color: "red" });
    return (
      <Box mb={96}>
        <Box className={classes.banner} />
      </Box>
    );
  }
  return (
    <Box mb={96}>
      <Box className={classes.banner} />
      <ProfileInfo
        artworks={data.tokenIds.length}
        description={data.description}
        facebook={data.facebook}
        followers={data.followers}
        instagram={data.instagram}
        name={data.user.name}
        twitter={data.twitter}
        image={data.user.image}
      />

      <Box px={"xl"} className={classes.container}>
        <Artworks ids={data.tokenIds} />
        <Awards awards={data.awards} />
      </Box>
    </Box>
  );
}

function Artworks({ ids }: { ids: { id: number }[] }) {
  const { classes } = useStyles();
  const [nfts, setNfts] = useState<NFT[]>([]);
  useEffect(() => {
    async function updateNFTs() {
      setNfts(await getAllNFTsById(ids));
    }
    updateNFTs();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Title color={"#C4811C"} mb={"xl"} size={36} order={2}>
        Artworks
      </Title>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "lg", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {nfts.map((nft) => (
          <NFTCard key={nft.tokenId} {...nft} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

function Awards({ awards }: { awards: { name: string }[] }) {
  const { classes } = useStyles();

  return (
    <Box className={classes.awardsContainer}>
      <Title order={2}>Awards</Title>
      <Timeline active={999} mt={"xl"}>
        {awards.map(({ name }, i) => (
          <Timeline.Item key={i}>
            <Title order={4} color={"brand"} weight={600}>
              {name}
            </Title>
          </Timeline.Item>
        ))}
      </Timeline>
    </Box>
  );
}

function ProfileInfo({
  artworks,
  facebook,
  followers,
  instagram,
  name,
  twitter,
  description,
  image,
}: {
  description: string;
  name: string;
  followers: number;
  artworks: number;
  instagram: string;
  facebook: string;
  twitter: string;
  image: string;
}) {
  const { classes } = useStyles();

  return (
    <Center>
      <Paper
        mx={"auto"}
        radius={"lg"}
        p="xl"
        shadow={"xl"}
        mt={-24}
        className={classes.detailsWrapper}
      >
        <Group position="apart" className={classes.detailsContainer} noWrap>
          <Stack align={"center"}>
            <Avatar radius={999} size={120} src={image} />

            <Stack align={"center"} spacing="xs">
              <Text size={"lg"} weight={600}>
                {name}
              </Text>
              <Button size="xs" radius={"md"} variant="outline">
                Follow
              </Button>
            </Stack>
          </Stack>
          <Text sx={{ maxWidth: 500 }} align="center">
            {description}
          </Text>

          <Stack spacing={"xs"}>
            <Group spacing={"xs"}>
              <BiUser color="#111" size={24} />
              <Text sx={{ color: "#111" }} weight={500}>
                {followers} Followers
              </Text>
            </Group>
            <Group spacing={"xs"}>
              <IoMdColorPalette color="#111" size={24} />
              <Text sx={{ color: "#111" }} weight={500}>
                {artworks} Artworks
              </Text>
            </Group>
            <Group position="apart">
              {twitter && (
                <ActionIcon
                  component={NextLink}
                  href={twitter}
                  variant="transparent"
                  color={"gray"}
                >
                  <FaTwitter size={24} />
                </ActionIcon>
              )}
              {facebook && (
                <ActionIcon
                  component={NextLink}
                  href={facebook}
                  variant="transparent"
                  color={"gray"}
                >
                  <FaFacebook size={24} />
                </ActionIcon>
              )}
              {instagram && (
                <ActionIcon
                  component={NextLink}
                  href={instagram}
                  variant="transparent"
                  color={"gray"}
                >
                  <FaInstagram size={24} />
                </ActionIcon>
              )}
            </Group>
          </Stack>
        </Group>
      </Paper>
    </Center>
  );
}
