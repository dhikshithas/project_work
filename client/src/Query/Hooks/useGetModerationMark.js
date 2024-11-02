import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetModerationMark = (batch) => {
  const url = "http://localhost:3001/get-moderation-mark";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["moderationMark", batch],
    queryFn: () => axios.get(url, { params: batch }),
  });

  return { data, isLoading, isError, error };
};
