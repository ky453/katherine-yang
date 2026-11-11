import { createContext, useContext } from "react";

export const AssistantContext = createContext(null);

export function useAssistant() {
  const assistant = useContext(AssistantContext);
  if (!assistant) throw new Error("The assistant must be inside AssistantProvider.");
  return assistant;
}
