import { Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";

import { FiX, FiImage, FiUpload } from "react-icons/fi";

export default function ImageUpload({
  setFieldValue,
  ...props
}: { setFieldValue: (s, f) => any } & Partial<DropzoneProps>) {
  const theme = useMantineTheme();
  return (
    <Dropzone
      onDrop={(files) => setFieldValue("image", files[0])}
      onReject={() =>
        showNotification({
          message: "Image is too big! (max 3Mb)",
          color: "red",
        })
      }
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      maxFiles={1}
      {...props}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 220, pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <FiUpload
            size={50}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <FiX
            size={50}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <FiImage size={50} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
