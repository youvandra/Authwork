import { AppShell as A } from "@mantine/core";
import Footer from "./Footer";
import Header from "./Header";

export default function Appshell({ children }: { children: React.ReactNode }) {
  return (
    <A padding={0} header={<Header />}>
      {children}
    </A>
  );
}
