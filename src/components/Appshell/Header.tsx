import {
  Group,
  Header as H,
  createStyles,
  Text,
  Box,
  Image,
  Burger,
  Drawer,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ConnectWallet from "../ConnectWallet";
import MainUserButton from "../MainUserButton/MainUserButton";

const useStyles = createStyles((t) => ({
  header: { backgroundColor: "transparent", position: "absolute" },
  onBig: { [t.fn.smallerThan("sm")]: { display: "none" } },
  onSmall: { [t.fn.largerThan("sm")]: { display: "none" } },
}));

export default function Header() {
  const { classes } = useStyles();
  const router = useRouter();
  const [opened, { close, open, toggle }] = useDisclosure(false);
  useEffect(() => {
    close();
  }, [router.pathname]);
  return (
    <H
      className={classes.header}
      withBorder={false}
      py={"md"}
      px="xl"
      height={0}
    >
      {opened && (
        <Drawer
          size={"full"}
          position="right"
          opened={opened}
          onClose={close}
          padding="md"
        >
          <Stack align={"start"}>
            <MainUserButton color="#111" />
            {LINKS.map((props, i) =>
              router.pathname === props.link ? (
                <DrawerLink
                  onClick={() => {
                    close();
                  }}
                  isActive
                  key={i}
                  {...props}
                />
              ) : (
                <DrawerLink
                  onClick={() => {
                    close();
                  }}
                  key={i}
                  {...props}
                />
              )
            )}
          </Stack>
        </Drawer>
      )}
      <Group position="apart">
        <NextLink href={"/"}>
          <Image width={39} height={52} src={"/Logo.png"} />
        </NextLink>
        <Group className={classes.onBig} spacing={40}>
          {LINKS.map((props, i) =>
            router.pathname === props.link ? (
              <Navitem isActive key={i} {...props} />
            ) : (
              <Navitem key={i} {...props} />
            )
          )}
        </Group>
        <Group spacing={"xl"}>
          <ConnectWallet />
          <Box className={classes.onBig}>
            <MainUserButton />
          </Box>
          <Burger
            color="white"
            opened={opened}
            onClick={() => {
              toggle();
            }}
            className={classes.onSmall}
          />
        </Group>
      </Group>
    </H>
  );
}

function Navitem({
  label,
  link,
  isActive = false,
}: NavItemType & { isActive?: boolean }) {
  return (
    <Box sx={{ position: "relative", color: "white" }}>
      <Text component={NextLink} href={link}>
        {label}
      </Text>
      {isActive && (
        <Box
          sx={{
            height: 2,
            width: "70%",
            backgroundColor: "#C4811C",
            position: "absolute",
            right: 0,
          }}
        />
      )}
    </Box>
  );
}

function DrawerLink({
  label,
  link,
  isActive = false,
  onClick,
}: NavItemType & { isActive?: boolean; onClick: () => void }) {
  return (
    <Box sx={{ position: "relative", color: "#111" }}>
      <Text
        weight={600}
        onClick={onClick}
        size={"xl"}
        component={NextLink}
        href={link}
      >
        {label}
      </Text>
      {isActive && (
        <Box
          sx={{
            height: 2,
            width: "70%",
            backgroundColor: "#C4811C",
            position: "absolute",
            left: 0,
          }}
        />
      )}
    </Box>
  );
}

interface NavItemType {
  label: string;
  link: string;
}

const LINKS: NavItemType[] = [
  { label: "Home", link: "/" },
  { label: "Artist", link: "/artist" },
  { label: "Event", link: "/event" },
  { label: "Museum", link: "/museum" },
  { label: "Explore", link: "/explore" },
];
