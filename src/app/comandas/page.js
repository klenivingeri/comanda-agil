"use client";
import React, { useEffect, useState } from "react";
import { useCommand } from "../../app/context/CommandContext";
import CommandView from "./CommandView";

export default function Page() {
  const [showCommands, setShowCommands] = useState(false);
  const { _command } = useCommand();
  useEffect(() => {
    _command.get();
    setShowCommands(true);
  }, []);

  return (
    <CommandView
      commandAll={_command.all}
      isLoadingCommand={_command.isLoading || !showCommands}
      errorCommand={_command.error}
    />
  );
}
