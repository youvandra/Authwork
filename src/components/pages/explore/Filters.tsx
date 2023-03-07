import {
  Stack,
  Text,
  ColorSwatch,
  Group,
  Box,
  Divider,
  Avatar,
} from "@mantine/core";

export default function Filters() {
  return (
    <Stack spacing={72}>
      <Stack spacing={"xs"}>
        <Group>
          <ColorSwatch size={16} color="#875A28" />
          <Text>Verified Arts</Text>
        </Group>
        <Group>
          <ColorSwatch size={16} color="#DDAB46" />
          <Text>Non - Verified Arts</Text>
        </Group>
      </Stack>
      <SelectedArtists />
      <SelectedMuseums />
    </Stack>
  );
}

function SelectedArtists() {
  return (
    <Box>
      <Text size={"lg"} weight={500}>
        Seleted <span style={{ color: "#DDAB46" }}>Artists</span>
      </Text>
      <Divider color={"#DDAB46"} />
      <Stack mt={"xl"}>
        <SelectedCard
          body="24 Arts"
          name="Zack Efron"
          image="https://images.unsplash.com/photo-1505962577034-fc157cf5b274?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <SelectedCard
          body="24 Arts"
          name="Zack Efron"
          image="https://images.unsplash.com/photo-1505962577034-fc157cf5b274?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <SelectedCard
          body="24 Arts"
          name="Zack Efron"
          image="https://images.unsplash.com/photo-1505962577034-fc157cf5b274?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <SelectedCard
          body="24 Arts"
          name="Zack Efron"
          image="https://images.unsplash.com/photo-1505962577034-fc157cf5b274?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
      </Stack>
    </Box>
  );
}

function SelectedMuseums() {
  return (
    <Box>
      <Text size={"lg"} weight={500}>
        Seleted <span style={{ color: "#DDAB46" }}>Museums</span>
      </Text>
      <Divider color={"#DDAB46"} />
      <Stack mt={"xl"}>
        <SelectedCard
          body="24 Collections"
          name="Van Gogh Museum"
          image="https://images.unsplash.com/photo-1624120975245-288d94b05f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <SelectedCard
          body="24 Collections"
          name="Van Gogh Museum"
          image="https://images.unsplash.com/photo-1624120975245-288d94b05f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <SelectedCard
          body="24 Collections"
          name="Van Gogh Museum"
          image="https://images.unsplash.com/photo-1624120975245-288d94b05f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <SelectedCard
          body="24 Collections"
          name="Van Gogh Museum"
          image="https://images.unsplash.com/photo-1624120975245-288d94b05f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
      </Stack>
    </Box>
  );
}

function SelectedCard({
  image,
  name,
  body,
}: {
  image: string;
  name: string;
  body: string;
}) {
  return (
    <Group align={"start"} noWrap>
      <Avatar radius={999} size={48} src={image} />
      <Box>
        <Text size={"sm"} weight={500}>
          {name}
        </Text>
        <Text size={"sm"}>{body}</Text>
      </Box>
    </Group>
  );
}
