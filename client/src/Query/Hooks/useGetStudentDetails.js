import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetStudentDetails = (roll_no) => {
  console.log("1", roll_no);
  const url = "http://localhost:3001/get-student-details";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["studentDetail", roll_no],
    queryFn: () => {
      return axios.get(url, { params: { roll_no } });
    },
  });

  console.log("Fetched data:", data);

  return { data, isLoading, isError, error };
};
