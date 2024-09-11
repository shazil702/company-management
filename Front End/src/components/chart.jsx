import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { Card, CardBody } from "@material-tailwind/react";
import { format, subDays } from "date-fns";

export default function Graph() {
    const [chartConfig, setChartConfig] = useState({
      type: "line",
      height: 240,
      series: [
        {
          name: "Attendance",
          data: [],
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#020617"],
        stroke: {
          lineCap: "round",
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: [],
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    });
  
    const getLastSevenDates = () => {
      const dates = [];
      for (let i = 0; i < 7; i++) {
        dates.push(format(subDays(new Date(), i), "yyyy-MM-dd"));
      }
      return dates.reverse();
    };
  
    useEffect(() => {
      const fetchAttendance = async () => {
        try {
          const { data } = await axios.get("http://127.0.0.1:8000/hr/view_attendance/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
  
          const lastSevenDates = getLastSevenDates();
            const attendanceMap = {};
          Object.keys(data).forEach((date) => {
            attendanceMap[date] = data[date].length;
          });
  
          const attendanceData = lastSevenDates.map(
            (date) => attendanceMap[date] || 0
          );
  
          setChartConfig((prevConfig) => ({
            ...prevConfig,
            series: [{ ...prevConfig.series[0], data: attendanceData }],
            options: {
              ...prevConfig.options,
              xaxis: {
                ...prevConfig.options.xaxis,
                categories: lastSevenDates,
              },
            },
          }));
          console.log(data);
          
        } catch (error) {
          console.log(error);
        }
      };
      fetchAttendance();
    }, []);
  
    return (
      <Card>
        <div className="flex justify-center items-center m-4">
        <h1 className="font-bold text-2xl">Weekly attendance</h1>
        </div>
        <CardBody className="px-2 pb-0">
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
    );
  }
  
