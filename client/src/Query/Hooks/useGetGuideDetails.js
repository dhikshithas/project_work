import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetGuideDetails = (id) => {
  const url = "http://localhost:3001/get-guide-details";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["guideDetail", id],
    queryFn: () => {
      return axios.get(url, { params: { id } });
    },
  });

  return { data, isLoading, isError, error };
};
