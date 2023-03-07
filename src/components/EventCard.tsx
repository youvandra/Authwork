import {
  Box,
  Button,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

export default function EventCard({
  image,
  price,
  details,
  name,
  id,
}: {
  image: string;
  price: number;
  details: string;
  name: string;
  id: string;
}) {
  return (
    <Card shadow="md" p="sm" radius="md">
      <Card.Section>
        <Image src={image} height={160} />
      </Card.Section>

      <Box>
        <Title mt={"xl"} color={"brand"} size={18} order={3}>
          {name}
        </Title>
        <Text mt={4} size={"sm"}>
          {details}
        </Text>
      </Box>
      <Group mt={"lg"} position="apart">
        <Text weight={"bold"}>{price} $</Text>
        <Button component={NextLink} href={`/event/${id}`} size="xs">
          Details
        </Button>
      </Group>
    </Card>
  );
}

export interface NFTMetadata {
  title: string;
  artist: string;
  year: string;
  technique: string;
  size: string;
  type: string;
  edition: string;
  condition: string;
  frame: string;
  status: string;
  description: string;
  image: string;
  price: string;
}

export interface NFT {
  price: any;
  tokenId: any;
  seller: any;
  owner: any;
  metadata: NFTMetadata;
}
