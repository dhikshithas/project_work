import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetBatchMark = (batch) => {
  const url = "http://localhost:3001/get-batch-marks";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["batchMark", batch],
    queryFn: () => axios.get(url, { params: batch }),
  });

  return { data, isLoading, isError, error };
};
