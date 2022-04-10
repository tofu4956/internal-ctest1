import { useState } from "react";
import { prefType } from "../../types/chart";
import { Chart } from "./Chart";
import { Checkbox } from "./Checkbox";

export const ChartContainer = () => {
  const [prefecture, setPrefecture] = useState<prefType[]>([
    {
      prefCode: 1,
      prefName: "北海道",
    },
  ]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<prefType[]>([]);
  return (
    <>
      <Checkbox
        prefecture={prefecture}
        setPrefecture={setPrefecture}
        selectedPrefecture={selectedPrefecture}
        setSelectedPrefecture={setSelectedPrefecture}
      />
      <Chart selectedPrefecture={selectedPrefecture} />
    </>
  );
};
