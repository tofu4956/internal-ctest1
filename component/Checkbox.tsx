import { useEffect, useState } from "react";

export const Checkbox = () => {
  const [prefecture, setPrefecture] = useState([{
    "prefCode": 1,
    "prefName": "北海道"
}]);
  useEffect(() => {
    const url = new URL("https://opendata.resas-portal.go.jp/api/v1/prefectures");
    fetch(url.toString(),{
      method: 'GET',
      cache: "default",
      headers: {
        "X-API-KEY": String("xcRG6U47jeaZppo3CCNMn3tI6Dx3nRlDbUvMXWiW")
      }
    })
    .then(res => res.json())
    .then(data => {
      setPrefecture(data.result)
    });
  }, []);
  return (
    <div>
      {prefecture.map((data) => (
        <label key={data['prefCode']}>
          <input type="checkbox" name={data['prefName']}/>
          {data['prefName']}
        </label>
      ))}
    </div>
  )
}