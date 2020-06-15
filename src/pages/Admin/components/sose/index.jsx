import React, { Component } from "react";
import { Card, Button, DatePicker } from "antd";

import moment from "moment";

import "./index.less";

const { RangePicker } = DatePicker;

//  左侧 
const tabList = [
    {
        key: "sales",
        tab: "销售量",
    },
    {
        key: "visits",
        tab: "浏览量",
    },
];

// content
const contentList = {
  sales: <p>sales content</p>,
  visits: <p>visits content</p>,
};
// 日期格式化
const dateFormat = "YYYY-MM-DD";

export default class sose extends Component {
  state = {
    tabKey: "sales",  // 默认显示 销售量
    datePicker: "day",   // 默认是 今日
    rangeTime: [
      moment(moment().format(dateFormat), dateFormat),
      moment(moment().format(dateFormat), dateFormat),
    ],
  };

  onTabChange = (tabKey) => {
    this.setState({
      tabKey
    });
  };
  changeDatePicker = (datePicker) => {
    return () => {
      let rangeTime = null;
      const time = moment(moment().format(dateFormat), dateFormat);
      switch (datePicker) {
        case "year":
          rangeTime = [time, moment(moment().add(1, "y").format(dateFormat), dateFormat)];
          break;
        case "mouth":
          rangeTime = [time, moment(moment().add(1, "M").format(dateFormat), dateFormat)];
          break;
        case "week":
          rangeTime = [time, moment(moment().add(7, "d").format(dateFormat), dateFormat)];
          break;
        default:
          rangeTime = [time, time];
          break;
      }
//   更改 state 中的数据   页面才能显示
    this.setState({
        datePicker,
        rangeTime
    })

    };
  };
  rangePickerChange = (dates) => {
      this.setState({rangeTime: dates})
  }


  render() {
    const { tabKey, datePicker, rangeTime } = this.state;
    const extra = (
      <div>
        <Button
          type={datePicker === "day" ? "link" : "text"}
          onClick={this.changeDatePicker("day")}
        >
          今日
        </Button>
        <Button
          type={datePicker === "week" ? "link" : "text"}
          onClick={this.changeDatePicker("week")}
        >
          本周
        </Button>
        <Button
          type={datePicker === "mouth" ? "link" : "text"}
          onClick={this.changeDatePicker("mouth")}
        >
          本月
        </Button>
        <Button
          type={datePicker === "year" ? "link" : "text"}
          onClick={this.changeDatePicker("year")}
        >
          全年
        </Button>
        &nbsp;&nbsp;&nbsp;
        <RangePicker value={rangeTime} onChange={this.rangePickerChange} />
      </div>
    );
    return (
      <Card
        style={{ width: "100%" }}
        tabList={tabList} // Tab左侧显示的内容
        activeTabKey={tabKey} // 选中的Tab
        tabBarExtraContent={extra} // Tab右边显示的内容
        onTabChange={this.onTabChange} // 点击Tab触发的事件
      >
        {contentList[tabKey]}
      </Card>
    );
  }
}
