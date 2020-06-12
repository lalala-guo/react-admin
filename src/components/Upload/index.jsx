/*
  上传七牛云 SDK 文档: https://developer.qiniu.com/kodo/sdk/1283/javascript
  上传凭证：https://developer.qiniu.com/kodo/manual/1208/upload-token
*/

import React, { Component } from "react";
import { Upload as AntdUpload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import * as qiniu from "qiniu-js"; // 七牛上传SDK
import { nanoid } from "nanoid"; // 用来生成唯一id

import { reqGetUploadToken } from "@api/edu/upload";

//  设置 视频大小的 最大限制  为 35mb
const MAX_VIDEO_SIZE = 35 * 1024 * 1024; 

export default class Upload extends Component {
  // 上传之前 要判断 uploadToken是否过期  时间为两个小时
  // 要将uploadToken保存起来

  //  获取uploadToken
  getUploadToken = () => {
    //    通过try catch 捕获错误  当本地没有 token时 就会解析失败 会进入 catch中 就初始化 uploadToken 和 expires
    try {
      //   解析成字符串  并解构
      const { uploadToken, expires } = JSON.parse(
        localStorage.getItem("upload_token")
      );
    //   // 判断 本地 token 是否过期
      if (!this.isValidUploadToken(expires)) {
        // 抛出错误
        throw new Error("uploadToken过期了~");
      }
    //   console.log(uploadToken, expires);
      
      // 返回 state
      return {
        uploadToken,
        expires,
      };
    } catch {
      // 解析失败 说明localStorage中并没有uploadToken  所以返回 初始化数据
      return {
        uploadToken: "", //   token
        expires: 0, //  过期时间
      };
    }
  };
  
  state = this.getUploadToken();
  

  // 保存UploadToken
  saveUploadToken = (uploadToken, expires) => {
      
    // 获取
    const data = {
      uploadToken,
      expires: Date.now() + expires * 1000 - 5 * 60 * 1000,
    };
    // 更新状态
    this.setState(data);
    // 保存在localStorage中  持久化存储
    localStorage.setItem("upload_token", JSON.stringify(data));
  };

  //   判断UploadToken 是否过期
  isValidUploadToken = (expires) => {
    return expires > Date.now(); // true : 未过期
  };

  // 请求
  fetchUploadToken = async () => {
    // 请求获取数据  并解构
    const { uploadToken, expires } = await reqGetUploadToken();
    //  保存
    this.saveUploadToken(uploadToken, expires);
  };

  // 上传
  beforeUpload = (file, fileList) => {
    //   返回Promise对象
    return new Promise(async (resolve, reject) => {
    //   console.log(file, fileList);
      // 限制 上传视频的大小   如果视频的大小 大于 最大设定的大小
      // 就提示  并终止上传
      if (file.size > MAX_VIDEO_SIZE) {
        // 提示
        message.warn("视频大小不能超过35mb");
        // 终止上传
        return reject;
      }

      const { expires } = this.state;

      // 上传之前 判断 token是否有效
      if (!this.isValidUploadToken(expires)) {
        // false 过期了重新请求
        await this.fetchUploadToken();
      }

      //  视频大小符合要求 就上传
      resolve(file);
    });
  };
  // 自定义上传
  customRequest = ({ file, onProgress, onSuccess, onError }) => {
    const { uploadToken } = this.state;
    // 利用 nanoid  生成长度为10随机id，并且一定会保证id是唯一的
    const key = nanoid(10);
    const putExtra = {
      fname: "", // 文件原名称
      // params: {}, // 用来放置自定义变量
      mimeType: ["video/mp4"], // 用来限定上传文件类型
    };
    const config = {
      // 当前对象存储库位于区域（华东 华南 华北...）
      // qiniu.region.z0   //: 代表华东区域
      region: qiniu.region.z1 //: 代表华北区域
      // qiniu.region.z2   //: 代表华南区域
      // qiniu.region.na0   //: 代表北美区域
      // qiniu.region.as0   //: 代表东南亚区域
      //   region: qiniu.region.z2,
    };
    // 上传文件
    var observable = qiniu.upload(
      file, // 上传的文件
      key, // 上传的文件新命名（保证唯一性）
      uploadToken, // 上传凭证
      putExtra,
      config
    );

    // 创建 observe
    const observe = {
      // 改进 进度条

      // 上传过程中 触发的回调函数  获取上传的总进度并更新
      next(res) {
        const percent = res.total.percent.toFixed(2);
        // 更新上次进度
        onProgress({ percent }, file);
      },
      //   失败
      error(err) {
        onError(err);
        message.error("上传视频失败~");
      },
      //   成功
      complete(res) {
        onSuccess(res);
        message.success("上传视频成功~");
      },
    };

    // 开始上传
    this.subscription = observable.subscribe(observe);
  };
  // 上传取消
  componentWillUnmount() {
    this.subscription.unsubscribe(); // 上传取消
  }

  render() {
    return (
      <AntdUpload
        className="upload"
        accept="video/mp4" // 决定上传选择的文件类型
        listType="picture"
        beforeUpload={this.beforeUpload}
        customRequest={this.customRequest}
      >
        <Button>
          <UploadOutlined /> 上传视频
        </Button>
      </AntdUpload>
    );
  }
}
