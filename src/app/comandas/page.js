"use client";
import React, { useEffect } from "react";
import { useCommand } from "../../app/context/CommandContext";
import CommandView from "./CommandView";

export default function Page() {
  const { _command } = useCommand();
  useEffect(() => {
    _command.get();
  }, []);

  return (
    <CommandView
      commandAll={_command.all}
      isLoadingCommand={_command.isLoading}
      errorCommand={_command.error}
    />
  );
}
