import { Avatar, Card, Group, Image, Text, Title } from "@mantine/core";
import { MdVerified } from "react-icons/md";
import { NFT } from "./NFTExploreCard";

export default function NFTCard({ metadata }: NFT) {
  return (
    <Card shadow="sm" p="sm" radius="md">
      <Card.Section>
        <Image src={metadata.image} height={160} />
      </Card.Section>
      <Title mt={"xl"} color={"brand"} order={3}>
        {metadata.title}
      </Title>
      <Group spacing={"xs"} mt={"xs"}>
        <Text size={"sm"}>Art by:</Text>
        <Group spacing={"xs"}>
          <Avatar src={metadata.image} radius={999} size={24} />{" "}
          <Text size={"sm"}>{metadata.artist}</Text>{" "}
          <MdVerified color="#0DBBFC" />
        </Group>
      </Group>
    </Card>
  );
}
