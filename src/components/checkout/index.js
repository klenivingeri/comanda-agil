import React, { useState } from "react";
import { useToast } from "src/hooks/useToast";
import { Checkout as ComponentCheckout } from "./Checkouts";

export const Checkout = ({totalComanda,commandCode, setTabPayment, commandID}) => {
  const toast = useToast();
  const [isLoadingCloseCommand, setisLoadingCloseCommand] = useState(false);
  const [methodID, setMethodID] = useState("CARD");
  const [statusID, setStatusID] = useState("PAID");
  const [isFinish, setIsFinish] = useState(false);
  const [openCenterModal, setOpenCenterModal] = useState(false);

  const postCloseCommand = async () => {
    setisLoadingCloseCommand(true);
    try {
      const resp = await fetch(
        `/api/comandas/close?_id=${commandID}&paymentMethod=${methodID}&statusId=${statusID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await resp.json();
      setIsFinish(true);
      setOpenCenterModal(true);
    } catch (_) {
      toast.error("Ocorreu um erro fechar a comanda!");
    } finally {
      setisLoadingCloseCommand(false);
    }
  };
  
  return <ComponentCheckout
    isFinish={isFinish}
    setTabPayment={setTabPayment}
    setMethodID={setMethodID}
    setStatusID={setStatusID}
    methodID={methodID}
    totalComanda={totalComanda}
    postCloseCommand={postCloseCommand}
    isLoadingCloseCommand={isLoadingCloseCommand}
    openCenterModal={openCenterModal}
    setOpenCenterModal={setOpenCenterModal}
    commandCode={commandCode}
  />;

}