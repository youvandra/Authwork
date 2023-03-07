import { Stack, Text } from "@mantine/core";

export default function Property({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Stack spacing={0}>
      <Text size={"xl"} weight={"bold"}>
        {label}
      </Text>
      <Text>{value}</Text>
    </Stack>
  );
}
