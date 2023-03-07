import {
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Paper,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextLink } from "@mantine/next";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { BiUser, BiEnvelope, BiLock, BiChevronDown } from "react-icons/bi";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { trpc } from "../utils/trpc";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/signup-banner.png')",
    height: 350,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  container: {
    width: 700,
    marginTop: t.spacing.xl * 2,
  },
}));

export default function SignUp() {
  const { classes } = useStyles();
  const router = useRouter();

  const form = useForm({
    initialValues: { name: "", email: "", password: "", role: "" },
    validate: {
      name: (v) => (v === "" ? "Name is required!" : null),
      email: (v) => (v === "" ? "Email is required!" : null),
      password: (v) => (v === "" ? "Password is required!" : null),
      role: (v) => (v === "" ? "Role is required!" : null),
    },
  });

  const signupMutation = trpc.auth.signUp.useMutation({
    onSuccess: (_, { password, email }: any) => {
      signIn("credentials", { redirect: false, password, email });
      router.reload();
    },
  });

  return (
    <Box mb={96}>
      <Box className={classes.banner}></Box>

      <Box>
        <Box mt={-200}>
          <Center>
            <Stack sx={{ color: "white" }} align={"center"} justify={"center"}>
              <Title>Welcome to AuthWork</Title>
              <Text>input your email and password</Text>
            </Stack>
          </Center>
          <Center>
            <Paper className={classes.container} shadow={"lg"} radius="lg">
              <Container p={24}>
                <form
                  onSubmit={form.onSubmit((data) => {
                    //@ts-ignore: enum vs string
                    signupMutation.mutate(data);
                  })}
                >
                  <Stack spacing={"xl"}>
                    <TextInput
                      {...form.getInputProps("email")}
                      type="email"
                      size="md"
                      styles={inputStyles}
                      label="email"
                      color="brand"
                      placeholder="example@email.com"
                      icon={<BiEnvelope color="#875A28" size={24} />}
                    />
                    <TextInput
                      {...form.getInputProps("name")}
                      size="md"
                      styles={inputStyles}
                      label="name"
                      color="brand"
                      placeholder="John Doe"
                      icon={<BiUser color="#875A28" size={24} />}
                    />
                    <PasswordInput
                      {...form.getInputProps("password")}
                      size="md"
                      styles={inputStyles}
                      label="password"
                      color="brand"
                      icon={<BiLock color="#875A28" size={24} />}
                    />
                    <Select
                      sx={{ maxWhidth: 300 }}
                      {...form.getInputProps("role")}
                      size="md"
                      styles={inputStyles}
                      rightSection={<BiChevronDown color="#875A28" size={24} />}
                      label="Role"
                      placeholder="Choose your role"
                      data={[
                        { label: "Artist", value: "artist" },
                        { label: "Curator", value: "curator" },
                        { label: "Collector", value: "collector" },
                      ]}
                    />
                    <Stack mt={"xl"}>
                      <Group position="apart">
                        <Text
                          variant="link"
                          color={"brand"}
                          component={NextLink}
                          href="/signin"
                        >
                          Sign in
                        </Text>
                        <Text
                          variant="link"
                          color={"brand"}
                          component={NextLink}
                          href="/#"
                        >
                          Forgot password ?
                        </Text>
                      </Group>
                      <Button
                        loading={signupMutation.isLoading}
                        type="submit"
                        color={"brand"}
                      >
                        Sign up
                      </Button>
                    </Stack>
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

const inputStyles = (t) => ({
  input: {
    border: `1px solid #875A28`,
    borderRadius: t.radius.md,
  },
  root: { color: t.colors.brand[5] },
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (session?.user)
    return {
      redirect: { destination: "/", permanent: false },
      props: {},
    };
  return { props: {} };
};
