import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import { FC, ReactNode } from "react";

interface QueryClientProviderProps {
  children: ReactNode;
}

export const QueryClientProvider: FC<QueryClientProviderProps> = ({
  children,
}) => {
  const queryClient = new QueryClient();

  return <Provider client={queryClient}>{children}</Provider>;
};
