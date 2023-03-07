import { Button, Card, Image, Stack, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";

export default function MuseumCard({ image, location, name, id }: Props) {
  return (
    <Card sx={{ border: "1px solid #875A28" }} p="xs" radius={"lg"}>
      <Image radius={"md"} height={160} src={image} />

      <Stack sx={{ textAlign: "center" }} spacing={0} mt={"xl"}>
        <Text weight={600}>{name}</Text>
        <Text size={"sm"}>{location}</Text>
        <Button
          radius={"md"}
          component={NextLink}
          href={`/museum/${id}`}
          mt={"xl"}
        >
          See Collection
        </Button>
      </Stack>
    </Card>
  );
}

interface Props {
  name: string;
  location: string;
  image: string;
  id: string;
}
