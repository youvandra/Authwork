import {
  Image,
  createStyles,
  Overlay,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Box,
  Space,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import SearchInput from "./SearchInput";

const useStyles = createStyles((t) => ({
  container: {
    color: "white",
    position: "relative",
    backgroundColor: "#111",
    paddingTop: 64 + 72,
    paddingLeft: t.spacing.xl,
    paddingRight: t.spacing.xl,
    paddingBottom: 155,
    display: "flex",
    [t.fn.largerThan("md")]: {
      display: "grid",
      gridColumn: "1f 1fr",
      paddingTop: 64 + 155,
      paddingLeft: 155,
      paddingRight: 155,
    },
  },
  onbig: {
    [t.fn.smallerThan("md")]: { display: "none" },
  },
  heading: {
    fontSize: 64,
    [t.fn.smallerThan("md")]: { fontSize: 58 },
  },
}));

export default function Hero() {
  const { classes } = useStyles();
  return (
    <SimpleGrid className={classes.container} cols={2}>
      <Overlay zIndex={0} opacity={0.6} color="#000" />
      <Stack align={"start"} sx={{ zIndex: 1 }}>
        <Title className={classes.heading}>Break the Limits</Title>
        <Text size={"md"}>
        Curated art marketplace that helps you discover 
        and buy authentic artworks across the globe
        </Text>{" "}
        <Text
          variant="link"
          sx={{ color: "white" }}
          mt={"md"}
          weight={500}
          href={"/explore"}
          component={NextLink}
        >
          More Arts
        </Text>
        <Space mt={"xs"} />
        <SearchInput />
      </Stack>
      <Box
        sx={{
          placeSelf: "center",
          marginTop: -50,
        }}
        className={classes.onbig}
      >
        <Image src="/ab2.png" />
      </Box>
    </SimpleGrid>
  );
}
