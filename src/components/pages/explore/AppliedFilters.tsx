import { Badge, Group, Text } from "@mantine/core";
import { FiX } from "react-icons/fi";

export default function AppliedFilters() {
  return (
    <Group>
      <Text>Showing 1-12 from - Arts</Text>
      <Group spacing={"xs"}>
        <Badge sx={{ cursor: "pointer" }} variant="outline" color={"brand"}>
          <Group align={"center"} spacing={0}>
            Verified
            <FiX />
          </Group>
        </Badge>
      </Group>
    </Group>
  );
}
