"use client";
import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [layoutType, setLayoutType] = useState("default");
  const [label, setLabel] = useState("");
  const [customRoute, setCustomRoute] = useState();

  return (
    <LayoutContext.Provider
      value={{
        layoutType,
        setLayoutType,
        label,
        setLabel,
        customRoute,
        setCustomRoute,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
