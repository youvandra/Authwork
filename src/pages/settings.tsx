import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  FileButton,
  Loader,
  MultiSelect,
  NavLink,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextLink } from "@mantine/next";
import { showNotification } from "@mantine/notifications";
import { MdOutlineUpload } from "react-icons/md";
import { uploadFileToIPFS } from "../utils/pinata";
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

export default function Settings() {
  const { data } = trpc.auth.getSession.useQuery();
  const { classes } = useStyles();
  const updatePhotoMutation = trpc.auth.updatePhoto.useMutation({
    onSuccess: () => {
      showNotification({ message: "Image changed successfully!" });
    },
    onError: () => {
      showNotification({ message: "Image was not changed!", color: "red" });
    },
  });

  async function onUpload(f: File) {
    await uploadFileToIPFS(f)
      // @ts-ignore
      .then(({ pinataURL }) => {
        updatePhotoMutation.mutate({ imageUrl: pinataURL });
      })
      .catch(() => {
        showNotification({
          color: "red",
          message: "there was a problem uploading your photo",
        });
      });
  }

  return (
    <Box>
      <Box className={classes.banner} />
      <Text align="center" weight={500} size={32} my={"xl"}>
        Settings
      </Text>
      <Center mb={96}>
        <Container p={"md"} size={"xs"}>
          <Stack sx={{ width: "100%" }}>
            {data ? (
              <Avatar radius={999} size={150} src={data.user.image} />
            ) : (
              <Center>
                {" "}
                <Loader />
              </Center>
            )}
            <FileButton onChange={onUpload} accept="image/png,image/jpeg">
              {(props) => (
                <Button loading={updatePhotoMutation.isLoading} {...props}>
                  Change image
                </Button>
              )}
            </FileButton>
            {data && data.user.role === "artist" && (
              <NavLink
                variant="filled"
                component={NextLink}
                href="edit-artist"
                label="edit artist profile"
              />
            )}
          </Stack>
        </Container>
      </Center>
    </Box>
  );
}
