import { useState } from "react";
import LayoutAccount from "../../Global-Components/LayoutAccount";
import Trades from "./components/Trades";

const TradeHistory = () => {
  const [page, setPage] = useState(1);
  const [xPage, setxPage] = useState(25);
  const [input, setInput] = useState(1);

  return (
    <LayoutAccount>
      <Trades
        page={page}
        setPage={setPage}
        xPage={xPage}
        setxPage={setxPage}
        input={input}
        setInput={setInput}
      />
    </LayoutAccount>
  );
};

export default TradeHistory;
