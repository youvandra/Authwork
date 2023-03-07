import {
  Box,
  Center,
  createStyles,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import EventCard from "../../components/EventCard";
import { trpc } from "../../utils/trpc";

const useStyles = createStyles((t) => ({
  banner: {
    width: "100%",
    backgroundImage: "url('/event-banner.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "50%",
    display: "grid",
    placeItems: "center",
    color: "white",
  },
}));

export default function Artist() {
  const { classes } = useStyles();
  const { data, isInitialLoading } = trpc.event.getAll.useQuery();
  if (isInitialLoading)
    return (
      <Box>
        <Box py={155} className={classes.banner}>
          <Box sx={{ textAlign: "center" }}>
            <Title size={48}>Events</Title>

            <Text>
              Showing a list of ongoing and upcoming exhibition events all over
              the world
            </Text>
          </Box>
        </Box>
        <Center py={96}>
          <Loader />
        </Center>
      </Box>
    );
  if (data)
    return (
      <Box>
        <Box py={155} className={classes.banner}>
          <Box sx={{ textAlign: "center" }}>
            <Title size={48}>Events</Title>

            <Text>
              Showing a list of ongoing and upcoming exhibition events all over
              the world
            </Text>
          </Box>
        </Box>

        <Title px={"xl"} my={"xl"} size={36} order={2}>
          <span style={{ color: "#C4811C" }}>Newest</span> Events
        </Title>
        <SimpleGrid
          mb={96}
          cols={4}
          breakpoints={[
            { maxWidth: "lg", cols: 3 },
            { maxWidth: "md", cols: 2 },
            { maxWidth: "xs", cols: 1 },
          ]}
          px={"xl"}
        >
          {data.map(
            ({ mainImage, name, date, ticketPrice, address, id }, i) => (
              <EventCard
                key={i}
                price={ticketPrice}
                details={`${date} | ${address}`}
                image={mainImage}
                name={name}
                id={id}
              />
            )
          )}
        </SimpleGrid>
      </Box>
    );
  return (
    <Box>
      <Box py={155} className={classes.banner}>
        <Box sx={{ textAlign: "center" }}>
          <Title size={48}>Events</Title>

          <Text>
            Showing a list of ongoing and upcoming exhibition events all over
            the world
          </Text>
        </Box>
      </Box>
      <Center py={96}>
        <Text weight={600} size={32}>
          There was a problem
        </Text>
      </Center>
    </Box>
  );
}
