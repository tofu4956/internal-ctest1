import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { prefType } from "../../types/chart";

export const Checkbox = ({
  prefecture,
  setPrefecture,
  selectedPrefecture,
  setSelectedPrefecture,
}: {
  prefecture: prefType[];
  setPrefecture: Dispatch<SetStateAction<prefType[]>>;
  selectedPrefecture: prefType[];
  setSelectedPrefecture: Dispatch<SetStateAction<prefType[]>>;
}) => {
  useEffect(() => {
    const url = new URL(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures"
    );

    fetch(url.toString(), {
      method: "GET",
      cache: "default",
      headers: {
        "X-API-KEY": String(process.env.NEXT_PUBLIC_RESAS_API_KEY),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrefecture(data.result);
      });
  }, [setPrefecture]);
  const onChangeEventListener = (event: any) => {
    if (event.target.checked === true) {
      const buffer = [...selectedPrefecture];
      buffer.push({
        prefCode: event.target.dataset.key,
        prefName: event.target.name,
      });
      setSelectedPrefecture(buffer);
    } else if (event.target.checked === false) {
      setSelectedPrefecture(
        selectedPrefecture.filter(
          (pref) => pref.prefCode !== event.target.dataset.key
        )
      );
    }
  };
  return (
    <div>
      {prefecture.map((data) => (
        <label key={data["prefCode"]}>
          <input
            type="checkbox"
            id={String(data["prefCode"])}
            data-key={data["prefCode"]}
            name={data["prefName"]}
            onChange={onChangeEventListener}
          />
          {data["prefName"]}
        </label>
      ))}
    </div>
  );
};
