import request from "@utils/request";

// 获取 七牛 上传凭证
export function reqGetUploadToken() {
  return request({
    url: `/uploadtoken`,
    method: "GET",
  });
}
