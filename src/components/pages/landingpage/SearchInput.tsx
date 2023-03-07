import { TextInput } from "@mantine/core";
import { MdSearch } from "react-icons/md";

export default function SearchInput() {
  return (
    <TextInput
      variant="unstyled"
      styles={{
        wrapper: {
          maxWidth: 250,
          border: "1px solid #DDAB46",
          borderRadius: 24,
        },
        input: { color: "white" },
      }}
      placeholder="Abstarct Painting"
      icon={<MdSearch color="white" size={24} />}
      name="art search"
    />
  );
}
