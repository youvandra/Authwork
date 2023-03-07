import {
  Box,
  Button,
  Center,
  Container,
  createStyles,
  MultiSelect,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { trpc } from "../utils/trpc";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/explore-banner.jpg')",
    height: 96,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
  },
  filtersContainer: {
    borderLeft: "1px solid #875A28",
    width: 300,
    height: "100%",
  },
}));

export default function EditArtist() {
  const form = useForm({
    initialValues: {
      description: "",
      tokenIds: [],
      facebook: "",
      twitter: "",
      instagram: "",
      followers: 500,
      awards: [],
    },
  });
  const artistMutation = trpc.artist.upsert.useMutation({
    onSuccess: () => {
      showNotification({ message: "profile updated successfully!" });
    },
    onError: () => {
      showNotification({
        message: "There was a problem updating your artist profile!",
        color: "red",
      });
    },
  });
  const { classes } = useStyles();
  return (
    <Box>
      <Box className={classes.banner} />
      <Center mt={96}>
        <Container size={"xs"}>
          <form
            onSubmit={form.onSubmit((data) => {
              artistMutation.mutate(data);
            })}
          >
            <Title color={"brand"} align="center">
              Create or update your Artist profile
            </Title>
            <Stack my={48}>
              <TextInput label="Bio" {...form.getInputProps("description")} />
              <TextInput label="Facebook" {...form.getInputProps("facebook")} />
              <TextInput label="Twitter" {...form.getInputProps("twitter")} />
              <TextInput
                label="Instagram"
                {...form.getInputProps("instagram")}
              />
              <MultiSelect
                searchable
                creatable
                data={[]}
                label="TokenIds"
                placeholder="add your nfts token ids"
                getCreateLabel={(query) => query}
                onCreate={(query) => {
                  const item = { value: query, label: query };
                  form.setFieldValue("tokenIds", [
                    ...form.values.tokenIds,
                    Number(item.value),
                  ]);
                  return item;
                }}
              />
              <MultiSelect
                searchable
                creatable
                data={[]}
                label="Awards"
                placeholder="add your awards"
                getCreateLabel={(query) => query}
                onCreate={(query) => {
                  const item = { value: query, label: query };
                  form.setFieldValue("awards", [
                    ...form.values.awards,
                    item.value,
                  ]);
                  return item;
                }}
              />
              <Button
                loading={artistMutation.isLoading}
                mt={"xl"}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Container>
      </Center>
    </Box>
  );
}
