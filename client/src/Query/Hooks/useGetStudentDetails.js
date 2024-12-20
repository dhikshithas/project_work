import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetStudentDetails = (roll_no) => {
  const url = "http://localhost:3001/get-student-details";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["studentDetail", roll_no],
    queryFn: () => {
      return axios.get(url, { params: { roll_no } });
    },
  });

  return { data, isLoading, isError, error };
};
