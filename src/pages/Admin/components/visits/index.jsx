import React from "react";
// 面积图表
import { AreaChart, ColumnChart } from "bizcharts";

import { Row, Col, Progress } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import Card from "@comps/Card";
import "./index.less";

const layout = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 6,
};

const data = [
  { year: "1991", value: 2 },
  { year: "1992", value: 50 },
  { year: "1993", value: 8 },
  { year: "1994", value: 30 },
  { year: "1996", value: 20 },
  { year: "1997", value: 8 },
  { year: "1998", value: 30 },
  { year: "1999", value: 9 },
];
const data2 = [
  {
    type: "家具家电",
    sales: 38,
  },
  {
    type: "粮油副食",
    sales: 52,
  },
  {
    type: "生鲜水果",
    sales: 61,
  },
  {
    type: "美容洗护",
    sales: 145,
  },
  {
    type: "母婴用品",
    sales: 48,
  },
  {
    type: "进口食品",
    sales: 38,
  },
  {
    type: "食品饮料",
    sales: 38,
  },
  {
    type: "家庭清洁",
    sales: 38,
  },
];
export default function Visits() {
  return (
    <Row gutter={16}>
      <Col {...layout}>
        <Card
          title="总销售额"
          number="￥123,456"
          content={
            <>
              <span>周同比 12%</span>
              &nbsp;&nbsp;
              <CaretUpOutlined style={{ color: "red" }} />
              &nbsp;&nbsp;&nbsp;
              <span>日同比 12%</span>
              &nbsp;&nbsp;
              <CaretDownOutlined style={{ color: "green" }} />
            </>
          }
          footer="日销售额:12,345"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="访问量"
          number="12,345"
          content={
            <div className="charts-container">
              <AreaChart
                data={data}
                forceFit // 自适应宽高
                smooth // 是否为曲线
                xField="year" //x轴加载数据的字段
                yField="value" //y轴加载数据的字段
                color='#108ee9' // 颜色
                xAxis={{ visible: false }} // 隐藏x轴
                yAxis={{ visible: false }} // 隐藏y轴
                meta={{
                  value: {
                    alias: "值",
                  },
                }}
              />
            </div>
          }
          footer="日销售额:12,345"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="支付笔数"
          number="24,253"
          content={
            <ColumnChart
              data={data2}
              forceFit
              padding="0"
              xField="type"
              yField="sales"
              meta={{
                type: {
                  alias: "类别",
                },
                sales: {
                  alias: "销售额(万)",
                },
              }}
              xAxis={{ visible: false }} // 隐藏x轴
              yAxis={{ visible: false }} // 隐藏y轴
            />
          }
          footer="日销售额:12,345"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="运营结果"
          number="25,345"
          content={
            <Progress
            status="active"
            strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
            }}
            percent={50}
          />
          }
          footer="日销售额:12,345"
        />
      </Col>
    </Row>
  );
}
