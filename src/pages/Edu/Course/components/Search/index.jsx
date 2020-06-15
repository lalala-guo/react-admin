import React, { useEffect, useState } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";
//  国际化 组件 引入
import { FormattedMessage, useIntl } from "react-intl";

import { reqGetAllTeacherList } from "@api/edu/teacher";
import { reqGetAllSubjectList, reqGetSubsubjectList } from "@api/edu/subject";
import "./index.less";

const { Option } = Select;

function SearchForm() {
  // 国际化
  const intl = useIntl();

  const [form] = Form.useForm();
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [options, setOptions] = useState([
    {
      value: "zhejiang",
      label: "Zhejiang",
      isLeaf: false,
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      isLeaf: false,
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      // 请求获取 讲师列表
      // const teachers = await reqGetAllTeacherList();
      // setTeachers(teachers);
      // // 请求获取 课程列表
      // const subjects = await reqGetSubjectList();
      // setSubjects(subjects);
      const [teachers, subjects] = await Promise.all([
        reqGetAllTeacherList(),
        reqGetAllSubjectList(),
      ]);
      setTeachers(teachers);
      const data = subjects.map((subject) => {
        return {
          value: subject._id,
          label: subject.title,
          isLeaf: false,
        };
      });
      setSubjects(data);
    };
    fetchData();
  }, []);

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  // 点击一级菜单调用函数
  // 加载二级菜单数据
  const loadData = async (selectedOptions) => {
    /*
      selectedOptions 代表当前选中的菜单
      当前是二级菜单：[{}] --> 里面的对象代表点击的一级菜单

      如果将来有三级菜单：[{一级菜单}, {二级菜单}, ....]
      结论：当前点击的菜单就是数组的最后一项值
    */
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // loading 状态 图标
    targetOption.loading = true;

    // console.log(targetOption);

    // 加载二级菜单数据

    const { items } = await reqGetSubsubjectList(targetOption.value);

    // 获取成功之后 关闭loading 图标
    targetOption.loading = false;
    // 如果 items有值   有二级菜单
    if (items.length) {
      targetOption.children = items.map((item) => {
        return {
          value: item._id,
          label: item.title,
        };
      });
    } else {
      // 没有二级菜单
      targetOption.isLeaf = true;
    }
    setSubjects([...subjects]);
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <Form layout="inline" form={form}>
      {/* <Form.Item name="title" label="标题"> */}
      <Form.Item
        name="title"
        label={intl.formatMessage({
          id: "title",
        })}
      >
        <Input placeholder={intl.formatMessage({
          id: "title",
        })} style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item
        name="teacherId"
        label={intl.formatMessage({
          id: "teacher",
        })}
      >
        <Select
          allowClear
          placeholder={intl.formatMessage({
            id: "teacher",
          })}
          style={{ width: 250, marginRight: 20 }}
        >
          {teachers.map((teacher) => {
            return (
              <Option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="subject"
        label={intl.formatMessage({
          id: "subject",
        })}
      >
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjects}
          loadData={loadData}
          // onChange={onChange}
          changeOnSelect
          placeholder={intl.formatMessage({
            id: "subject",
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          <FormattedMessage id="searchBtn" />
        </Button>
        <Button onClick={resetForm}>
        <FormattedMessage id="resetBtn" />
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
