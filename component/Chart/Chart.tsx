import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { prefType } from "../../types/chart";

export const Chart = ({
  selectedPrefecture,
}: {
  selectedPrefecture: prefType[];
}) => {
  const chartCss = css`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 2em;
  `
  
  // Chart X-Axis validation
  const [rechartdata, setReChartData] = useState([{year: 1960},{year: 1965},{year: 1970},{year: 1975},{year: 1980},{year: 1985},{year: 1990},{year: 1995},{year: 2000},{year: 2005},{year: 2010},{year: 2015},{year: 2020},{year: 2025},{year: 2030},{year: 2035},{year: 2040}]);
  useEffect(() => {
    const url = new URL(
      "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear"
    );
    url.searchParams.set("cityCode", "-");
    const Chartdata: any = rechartdata;
    setReChartData([]);
    selectedPrefecture.map((pref) => {
      setTimeout(() => {
        url.searchParams.set("prefCode", String(pref.prefCode));
        if (pref["prefName"] in Chartdata === false)
          fetch(url, {
            method: "GET",
            cache: "default",
            headers: {
              "X-API-KEY": String(process.env.NEXT_PUBLIC_RESAS_API_KEY),
            },
          })
            .then((res) => res.json())
            .then((data) => {
              data.result.data[0].data.map(
                (data: { year: number; value: number }) => {
                  const index = Chartdata.findIndex(
                    (x: any) => data.year === x.year
                  );
                  if (index !== -1) {
                    Chartdata[index][pref["prefName"]] = data.value;
                  } else {
                    const obj: any = {};
                    obj["year"] = data.year;
                    obj[pref["prefName"]] = data.value;
                    Chartdata.push(obj);
                  }
                }
              );
            });
      }, 300);
      console.log(Chartdata);
    });
    setReChartData(Chartdata);
  }, [rechartdata, selectedPrefecture]);
  return (
    <div className={chartCss}>
    <ResponsiveContainer width={'99%'} height={500}>
    <LineChart
      width={600}
      height={600}
      data={rechartdata}
      syncId="1"
      margin={{ top: 30, right: 30, left: 50, bottom: 5 }}
    >
      <XAxis
        dataKey="year"
        type="number"
        interval={0}
        label={{ value: "年度", offset: -5, position: "insideBottomRight" }}
        domain={['dataMin', 'dataMax']}
      />
      <YAxis
        interval={0}
        label={{ value: "総人口", offset: -20, position: "insideTopLeft" }}
      />
      <Tooltip />
      {selectedPrefecture.map((data) => {
        return(
        <Line
          type="linear"
          key={data.prefCode}
          dataKey={data.prefName}
          stroke={`#${Math.floor(
            Math.random() * (Math.ceil(4294967295) - Math.ceil(0) + 1) +
              Math.ceil(0)
          ).toString(16)}`}
        />)
      })}
      <Legend
        align="right"
        verticalAlign="top"
        layout="vertical"
        wrapperStyle={{ right: 15, top: 20 }}
      />
    </LineChart>
    </ResponsiveContainer>
    </div>
  );
};
