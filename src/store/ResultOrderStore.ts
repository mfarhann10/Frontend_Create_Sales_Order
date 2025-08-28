import { create } from "zustand";
import type { FormData } from "../pages/SalesOrderForm";

type ResultOrderState = {
  resultOrderData: FormData | null;
  setResultOrderData: (data: FormData) => void;
};

export const useResultOrderStore = create<ResultOrderState>((set) => ({
  resultOrderData: null,
  setResultOrderData: (data) => set({ resultOrderData: data }),
}));