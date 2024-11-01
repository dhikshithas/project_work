import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useFormEntryDetails = () => {
  const url = "http://localhost:3001/formEntry";

  const formEntryMutation = useMutation({
    mutationFn: (formEntryDetails) => {
      return axios.post(url, formEntryDetails);
    },
  });
  const { mutate, isSuccess, isError, isPending, data, error, mutateAsync } =
    formEntryMutation;

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
