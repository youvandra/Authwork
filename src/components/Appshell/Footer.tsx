import { ActionIcon, Group, Image, Stack, Text, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { FaDiscord, FaTwitter, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <Stack align={"start"} sx={{ backgroundColor: "#010101" }} p={"xl"}>
      <Group align={"end"} sx={{ width: "100%" }} position="apart">
        <Stack align={"center"} spacing={0}>
          <NextLink href={"/"}>
            <Image width={52} src={"/Logo.png"} />
          </NextLink>
          <Text color={"white"}>AuthWork</Text>
        </Stack>
        <Group position="left" spacing={"xl"} sx={{ color: "#818181" }}>
          {SOCIALS.map(({ Icon, link }, i) => (
            <ActionIcon
              size={"xl"}
              variant="transparent"
              color={"gray"}
              component={NextLink}
              href={link}
              key={i}
            >
              <Icon size={28} />
            </ActionIcon>
          ))}
        </Group>
      </Group>

      <Group position="apart" sx={{ width: "100%" }}>
        <Text color={"gray"} size={"sm"}>
          Copyright 2022 AuthWork. All rights reserved.
        </Text>
        <Group>
          {LINKS.map(({ label, link }) => (
            <Text
              key={label}
              color="gray"
              component={NextLink}
              href={link}
              variant="link"
              size={"sm"}
            >
              {label}
            </Text>
          ))}
        </Group>
      </Group>
    </Stack>
  );
}

const SOCIALS = [
  { Icon: FaTwitter, link: "/#" },
  { Icon: FaDiscord, link: "/#" },
  { Icon: FaTelegramPlane, link: "/#" },
];

const LINKS = [
  { label: "Terms & Conditions", link: "/#" },
  { label: "Privacy Policy", link: "/#" },
  { label: "Contact Us", link: "/#" },
];
