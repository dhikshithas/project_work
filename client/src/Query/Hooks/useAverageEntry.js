import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAverageEntry = () => {
  const url = "http://localhost:3001/averageEntry";

  const averageEntryMutation = useMutation({
    mutationFn: (averageEntryDetails) => {
      return axios.post(url, averageEntryDetails);
    },
  });

  const { mutate, isSuccess, isError, isPending, data, error, mutateAsync } =
    averageEntryMutation;

  return {
    mutate,
    isSuccess,
    isError,
    isPending,
    data,
    error,
    mutateAsync,
  };
};
