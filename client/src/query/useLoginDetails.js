import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLoginDetails = () => {
  const url = "http://localhost:3001/login";

  const loginMutation = useMutation({
    mutationFn: (loginDetails) => {
      return axios.post(url, loginDetails);
    },
  });
  const { mutate, isSuccess, isError, isPending, data, error, mutateAsync } =
    loginMutation;

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
