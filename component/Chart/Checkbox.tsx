import { css } from "@emotion/css";
import { Dispatch, SetStateAction, useEffect } from "react";
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
  const checkboxOuter = css`
    margin: 1em;
  `;
  const checkboxItem = css`
    padding-top: 15px;
    padding-bottom: 15px;
    display: grid;
    font-size: 10px;
    gap: 12px;
    margin: auto;
    align-items: center;
    place-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    @media (min-width: 480px) {
      font-size: 14px;
    }
    @media (min-width: 768px) {
      font-size: 20px;
    }
  `;

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
      .then((res) => {
        if (!res.ok) {
          console.error("server error");
        }
        return res.json();
      })
      .then((data) => {
        setPrefecture(data.result);
      });
  }, [setPrefecture]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className={checkboxOuter}>
      <div className={checkboxItem}>
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
    </div>
  );
};
