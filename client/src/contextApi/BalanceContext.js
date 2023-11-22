import React, { createContext, useReducer, useContext } from "react";

const BalanceContext = createContext();

const initialState = {
  balance: Infinity, // Initial balance
  transactions: [
    {
      amount: 55,
      from: "0x5f4dcc7b6501f3b5aa765d61d834f2a27deb882c509073def94f2a9",
      hash: "0xBcIaN2UQ9gPLbVHLFYAdQ9FLssibUGtiSxLGdW9golzStGKnyXBXr1",
      status: "Success",
      time: "10/25/2023, 12:25:35 AM",
      to: "0x3e95bca69e54c432cc3d3b4a72a7c3ab4c7b7509073de6bc6e6758ed1a6cd37a",
    },
    {
      amount: 12,
      from: "0x5f4dcc7b6501f3b5aa765d61d834f2a27deb882c509073def94f2a9",
      hash: "0xUGtiSxLGdWGFkr119golzStGKnyXBXr1BcIaN2bVHLFYAdQ9FLssib",
      status: "Success",
      time: "10/25/2023, 12:26:59 AM",
      to: "0x3e95bca69e54c432cc3d3b4a72a7c3ab4c7b7509073de6bc6e6758ed1a6cd37a",
    },
  ],
  addresses: [],
};

const balanceReducer = (state, action) => {
  switch (action.type) {
    case "TRANSFER":
      // console.log(state.balance - action.amount,state.balance , action.amount)
      // returning prev state and newly added transaction with prev mock transactions
      // console.log( ...state,
      //     state.balance - action.amount,
      //      [...state.transactions, action.transaction],)
      return {
        ...state,
        balance: state.balance - action.amount,
        transactions: [...state.transactions, action.transaction],
      };
    case "ADDRESSES":
      return {
        ...state,
        addresses: action.addresses,
      };

    default:
      return state;
  }
};

export const BalanceProvider = ({ children }) => {
  const [balanceAvl, dispatch] = useReducer(balanceReducer, initialState);

  return (
    <BalanceContext.Provider value={{ balanceAvl, dispatch }}>
      {children}
    </BalanceContext.Provider>
  );
};

// creating a custom hook for using the context for above
export const useBalance = () => {
  return useContext(BalanceContext);
};
