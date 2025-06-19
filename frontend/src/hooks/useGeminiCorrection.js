import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "../lib/axios";

export const useGeminiCorrection = () => {
  return useMutation({
    mutationFn: async (text) => {
      const res = await axiosInstance.post("/correct", { text });
      return res.data.corrected;
    },
  });
};
