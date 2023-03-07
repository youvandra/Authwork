import { ActionIcon, createStyles, Group } from "@mantine/core";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
const useStyles = createStyles((t) => ({
  filters: {
    [t.fn.smallerThan("xs")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
}));

export default function Pagination({
  active,
  pageCount,
}: {
  active: number;
  pageCount: number;
}) {
  const { classes } = useStyles();
  return (
    <Group noWrap align={"start"} spacing={"sm"}>
      <ActionIcon variant="transparent" color={"brand"} size="md">
        <MdArrowBack size={24} />
      </ActionIcon>
      <Group spacing={"xs"}>
        <ActionIcon variant="filled" color={"brand"} size="md">
          1
        </ActionIcon>
        <ActionIcon variant="outline" color={"brand"} size="md">
          2
        </ActionIcon>
        <ActionIcon variant="outline" color={"brand"} size="md">
          3
        </ActionIcon>
        <ActionIcon variant="outline" color={"brand"} size="md">
          4
        </ActionIcon>
        <ActionIcon variant="outline" color={"brand"} size="md">
          5
        </ActionIcon>
        ...
        <ActionIcon variant="outline" color={"brand"} size="md">
          9
        </ActionIcon>
      </Group>
      <ActionIcon variant="transparent" color={"brand"} size="md">
        <MdArrowForward size={24} />
      </ActionIcon>
    </Group>
  );
}
