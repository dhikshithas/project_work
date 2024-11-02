import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetStudentMarks = () => {
  const url = "http://localhost:3001/get-student-marks";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["studentMark"],
    queryFn: () => axios.get(url),
  });

  return { data, isLoading, isError, error };
};
