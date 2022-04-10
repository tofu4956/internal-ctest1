import { useEffect, useState } from "react"
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

export const Chart = ({}) => {
  const [chartdata, setChartData] = useState([])
  useEffect(() => {
    const url = new URL("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear");
    url.searchParams.set("prefCode", String(1));
    url.searchParams.set("cityCode", '-');
    fetch(url,{
      method: 'GET',
      cache: "default",
      headers: {
        "X-API-KEY": String("xcRG6U47jeaZppo3CCNMn3tI6Dx3nRlDbUvMXWiW")
      }
    })
    .then(res => res.json())
    .then(data => setChartData(data.result.data[0].data));
  },[]);
  return (
  <LineChart width={600} height={600} data={chartdata} margin={{ top: 30, right: 30, left: 50, bottom: 5 }}>
    <XAxis dataKey="year" label={{ value: "年度", offset: -5,position: "insideBottomRight"}}/>
    <YAxis interval={0} label={{ value: '総人口', offset: -20, position: 'insideTopLeft' }}/>
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
  )
}