import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetBatchMark = (batch) => {
  const url = "http://localhost:3001/get-batch-marks";
  console.log("Batch info being sent:", batch);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["batchMark", batch],
    queryFn: () => {
      const params = typeof batch === "string" ? { batch } : { batch: batch };
      return axios.get(url, { params });
    },
  });

  console.log("Fetched data:", data);

  return { data, isLoading, isError, error };
};
