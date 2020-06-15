import React, { Component } from "react";
import { Card, Button, Radio } from "antd";

import {
  Chart,
  registerShape,
  Legend,
  Geom,
  Axis,
  Tooltip,
  Interval,
  Interaction,
  Coordinate,
  Annotation,
} from "bizcharts";

import "./index.less";

// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
const data = [
  {
    type: "分类一",
    value: 20,
  },
  {
    type: "分类二",
    value: 18,
  },
  {
    type: "分类三",
    value: 32,
  },
  {
    type: "分类四",
    value: 15,
  },
  {
    type: "Other",
    value: 15,
  },
];

const sliceNumber = 0.01; // 自定义 other 的图形，增加两条线

registerShape("interval", "sliceShape", {
  draw(cfg, container) {
    const points = cfg.points;
    let path = [];
    path.push(["M", points[0].x, points[0].y]);
    path.push(["L", points[1].x, points[1].y - sliceNumber]);
    path.push(["L", points[2].x, points[2].y - sliceNumber]);
    path.push(["L", points[3].x, points[3].y]);
    path.push("Z");
    path = this.parsePath(path);
    return container.addShape("path", {
      attrs: {
        fill: cfg.color,
        path: path,
      },
    });
  },
});

const total = data.reduce((pre, item) => {
  return pre + item.value;
}, 0);

export default class SearchRight extends Component {
  state = {
    radioValue: "all",
  };

  onChange = (e) => {
    const value = e.target.value;
    this.setState({
      radioValue: value,
    });
  };

  render() {
    return (
      <Card
        className="searchRight"
        title="销售类别占比"
        extra={
          <Radio.Group onChange={this.onChange} defaultValue="a">
            <Radio.Button value="a">全部渠道</Radio.Button>
            <Radio.Button value="b">线上</Radio.Button>
            <Radio.Button value="c">门店</Radio.Button>
          </Radio.Group>
        }
      >
        <Chart data={data} height={500} autoFit>
          {/* 饼状图  radius外圈半径 innerRadius内圈半径 */}
          <Coordinate type="theta" radius={0.56} innerRadius={0.65} />
          {/* 隐藏坐标轴 */}
          <Axis visible={false} />
          <Tooltip
            showTitle={false} // 是否展示 tooltip 标题。
            itemTpl='<li style="height:20px" data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{name}: ￥ {value}</li>'
          />
          {/* 图形状 */}
          <Interval
            adjust="stack"
            position="value"
            color="type"
            shape="sliceShape"
            label={[
              "value",
              {
                offset: -15,
              },
            ]}
          />
          {/* 鼠标移入 */}
          <Interaction type="element-single-selected" />

          {/* 图形标注 */}
          <Annotation.Text
            position={["50%", "45%"]}
            content="销售额"
            style={{
              lineHeight: "240px",
              fontSize: "16",
              fill: "#262626",
              textAlign: "center",
            }}
          />
          <Annotation.Text
            position={["50%", "55%"]}
            content={total}
            style={{
              lineHeight: "240px",
              fontSize: "30",
              fill: "#262626",
              textAlign: "center",
              fontWeight: "500",
            }}
          />
          <Legend position="right" />
        </Chart>
      </Card>
    );
  }
}
