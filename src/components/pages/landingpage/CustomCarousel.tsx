import { Carousel } from "@mantine/carousel";

export default function CustomCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel
      styles={{
        control: { backgroundColor: "#C4811C", color: "white", border: "none" },
      }}
      controlsOffset={"xs"}
      slideSize="25%"
      slideGap="xl"
      breakpoints={[
        { maxWidth: "lg", slideSize: "33.33333333%" },
        { maxWidth: "md", slideSize: "50%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ]}
      align="start"
    >
      {children}
    </Carousel>
  );
}
