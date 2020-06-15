import React, { Component } from "react";
import { Card, Radio } from "antd";

// 环形图
import { DonutChart } from "bizcharts";

import "./index.less";

// 数据源
const data = [
  {
    type: "分类一",
    value: 27,
  },
  {
    type: "分类二",
    value: 25,
  },
  {
    type: "分类三",
    value: 18,
  },
  {
    type: "分类四",
    value: 15,
  },
  {
    type: "分类五",
    value: 10,
  },
  {
    type: "其它",
    value: 5,
  },
];

export default class Search extends Component {
    state = {
        radioValue:"all"
    }
    onChange = (e) => {
        const value = e.target.value
        this.setState({
          radioValue: value
        })
    }

  render() {
    return (
      <Card
        className="search"
        title="销售额类别占比"
        extra={
          <Radio.Group onChange={this.onChange} defaultValue="a">
            <Radio.Button value="a">全部渠道</Radio.Button>
            <Radio.Button value="b">线上</Radio.Button>
            <Radio.Button value="c">门店</Radio.Button>
          </Radio.Group>
        }
      >
        <DonutChart
          data={data}
          forceFit
          radius={0.8}
          padding="auto"
          angleField="value"
          colorField="type"
          statistic={{
            visible: true,
            totalLabel: "销售额",
          }}
        />
      </Card>
    );
  }
}
