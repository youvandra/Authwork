import {
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Image,
  Input,
  Overlay,
  Paper,
  PasswordInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { showNotification } from "@mantine/notifications";
import { ethers } from "ethers";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import ImageUpload from "../components/pages/post-nft/ImageUpload";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";
import ABI from "../utils/ABI.json";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1566054757965-8c4085344c96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80')",
    height: 350,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    position: "relative",
  },
  container: {
    maxWidth: 700,
    width: 700,
    [t.fn.smallerThan("md")]: {
      width: "100%",
      marginLeft: 16,
      marginRight: 16,
    },
    marginTop: t.spacing.xl * 2,
    zIndex: 1,
  },
}));

export default function PostNFT() {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      title: "",
      artist: "",
      year: "",
      technique: "",
      size: "",
      type: "",
      edition: "",
      condition: "",
      frame: "",
      status: "",
      description: "",
      image: undefined,
      price: "",
    },
  });
  const imageUrl = form.values.image && URL.createObjectURL(form.values.image);

  async function uploadMetadataToIPFS() {
    const { image, ...fromValues } = form.values;
    //uploading image to ipfs

    const uploadImage = await uploadFileToIPFS(image);
    if (uploadImage.success === true) {
      //@ts-ignore
      console.log("Uploaded image to Pinata: ", uploadImage.pinataURL);
    }

    const nftJSON = {
      ...fromValues,
      //@ts-ignore
      image: uploadImage.pinataURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        //@ts-ignore
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function listNFT() {
    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      showNotification({ message: "Please wait.. uploading (upto 5 mins)" });

      //Pull the deployed contract instance
      const contract = new ethers.Contract(
        "0xE4418bC4B94dbfD76018c50E71f0966B69B6B2D9",
        ABI,
        signer
      );

      //massage the params to be sent to the create NFT request
      const price = ethers.utils.parseUnits(form.values.price, "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();

      //actually create the NFT
      const transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });
      await transaction.wait();

      showNotification({
        color: "green",
        message: "Successfully listed your NFT!",
      });
    } catch (e) {
      showNotification({ color: "red", message: "Upload error" + e });
    }
  }

  return (
    <Box mb={96}>
      <Box className={classes.banner}>
        <Overlay color={"#111"} zIndex={1} opacity={0.75} />
      </Box>

      <Box>
        <Box mt={-200}>
          <Center>
            <Stack
              sx={{ color: "white", zIndex: 1 }}
              align={"center"}
              justify={"center"}
            >
              <Title>List NFT (COA)</Title>
            </Stack>
          </Center>
          <Center>
            <Paper className={classes.container} shadow={"lg"} radius="lg">
              <Container p={24}>
                <form
                  onSubmit={form.onSubmit(() => {
                    setIsLoading(true);
                    listNFT().finally(() => {
                      setIsLoading(false);
                    });
                  })}
                >
                  <Stack spacing={"xl"}>
                    <TextInput
                      required
                      {...form.getInputProps("title")}
                      type="text"
                      size="md"
                      label="Title"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("artist")}
                      type="text"
                      size="md"
                      label="Artist"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("year")}
                      type="text"
                      size="md"
                      label="Year of making"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("technique")}
                      type="text"
                      size="md"
                      label="Technique"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("size")}
                      type="text"
                      size="md"
                      label="Size"
                    />
                    <Select
                      required
                      {...form.getInputProps("type")}
                      type="text"
                      size="md"
                      label="Type"
                      data={["Painting", "Sculpture", "Photograph"]}
                      sx={{ maxWidth: 300 }}
                    />
                    <TextInput
                      required
                      {...form.getInputProps("edition")}
                      type="text"
                      size="md"
                      label="Edition"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("condition")}
                      type="text"
                      size="md"
                      label="Condition"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("frame")}
                      type="text"
                      size="md"
                      label="Frame"
                    />
                    <TextInput
                      required
                      {...form.getInputProps("status")}
                      type="text"
                      size="md"
                      label="Status"
                    />
                    <Textarea
                      required
                      {...form.getInputProps("description")}
                      type="text"
                      size="md"
                      label="Description"
                      minRows={3}
                    />

                    <Input.Wrapper required>
                      <Input.Label mb={4}>Image</Input.Label>
                      <ImageUpload setFieldValue={form.setFieldValue} />

                      {imageUrl && (
                        <Image
                          fit="scale-down"
                          height={160}
                          src={imageUrl}
                          imageProps={{
                            onLoad: () => URL.revokeObjectURL(imageUrl),
                          }}
                        />
                      )}
                    </Input.Wrapper>

                    <TextInput
                      required
                      {...form.getInputProps("price")}
                      type="text"
                      size="md"
                      label="Price"
                    />

                    <Button
                      mt={"xl"}
                      loading={isLoading}
                      type="submit"
                      color={"brand"}
                    >
                      List NFT
                    </Button>
                  </Stack>
                </form>
              </Container>
            </Paper>
          </Center>
        </Box>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  //if not admin redirect
  // @ts-ignore
  if (session?.user?.role !== "admin")
    return {
      redirect: { destination: "/", permanent: false },
      props: {},
    };
  return { props: {} };
};
