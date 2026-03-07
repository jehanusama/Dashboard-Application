import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction, TransactionStatus } from "@/lib/mockData/types";
import { MOCK_TRANSACTIONS } from "@/lib/mockData/transactions";

interface DataState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  filters: {
    search: string;
    status: TransactionStatus | "all";
  };
  sort: {
    key: keyof Transaction | null;
    direction: "asc" | "desc";
  };
  pagination: {
    currentPage: number;
    pageSize: number;
  };
  isLoading: boolean;
}

const initialState: DataState = {
  transactions: MOCK_TRANSACTIONS,
  filteredTransactions: MOCK_TRANSACTIONS,
  filters: {
    search: "",
    status: "all",
  },
  sort: {
    key: "date",
    direction: "desc",
  },
  pagination: {
    currentPage: 1,
    pageSize: 8,
  },
  isLoading: false,
};

const applyFiltersAndSort = (state: DataState) => {
  let result = [...state.transactions];

  if (state.filters.search) {
    const query = state.filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.customerName.toLowerCase().includes(query) ||
        t.customerEmail.toLowerCase().includes(query) ||
        t.id.toLowerCase().includes(query),
    );
  }

  if (state.filters.status !== "all") {
    result = result.filter((t) => t.status === state.filters.status);
  }

  if (state.sort.key) {
    const { key, direction } = state.sort;
    result.sort((a, b) => {
      const valA = a[key] ?? "";
      const valB = b[key] ?? "";

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  state.filteredTransactions = result;

  const maxPage = Math.ceil(result.length / state.pagination.pageSize) || 1;
  if (state.pagination.currentPage > maxPage) {
    state.pagination.currentPage = 1;
  }
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.pagination.currentPage = 1; 
      applyFiltersAndSort(state);
    },
    setStatusFilter: (
      state,
      action: PayloadAction<TransactionStatus | "all">,
    ) => {
      state.filters.status = action.payload;
      state.pagination.currentPage = 1; 
      applyFiltersAndSort(state);
    },
    setSort: (state, action: PayloadAction<keyof Transaction>) => {
      if (state.sort.key === action.payload) {
        state.sort.direction = state.sort.direction === "asc" ? "desc" : "asc";
      } else {
        state.sort.key = action.payload;
        state.sort.direction = "asc";
      }
      applyFiltersAndSort(state);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
      state.pagination.currentPage = 1;
      applyFiltersAndSort(state);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setSearch,
  setStatusFilter,
  setSort,
  setPage,
  setPageSize,
  setLoading,
} = dataSlice.actions;

export default dataSlice.reducer;
