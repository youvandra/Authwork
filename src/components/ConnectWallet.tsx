import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CHAIN_ID, CHAIN_PARAMS } from "../const";


export default function ConnectWallet() {
  const router = useRouter();
  const { status, connect, addChain, chainId, switchChain } = useMetaMask();

  async function handleNetworkChange() {
    await switchChain(CHAIN_ID)
      .catch(async (err) => {
        if (err.code === 4902) await addChain(CHAIN_PARAMS);
      })
      .then(() => {
        router.reload();
      });
  }

  const handleClick = () => {
    if (status === "notConnected")
      connect().then(() => {
        router.reload();
      });
  };

  useEffect(() => {
    if (status === "notConnected")
      showNotification({ message: "Metamask is not connected!", color: "red" });
    if (status === "unavailable")
      showNotification({
        message: "A wallet was not detected!",
        color: "red",
      });
  }, [status]);

  useEffect(() => {
    if (status === "connected" && chainId !== CHAIN_ID) {
      handleNetworkChange();
      showNotification({ message: "wrong network!", color: "red" });
    }
  }, [chainId]);
  return (
    <Button
      loading={status === ("initializing" || "connecting")}
      onClick={handleClick}
      variant="white"
      color={"dark"}
      radius={"xl"}
    >
      {status === "notConnected" ? "Connect" : status}
    </Button>
  );
}
