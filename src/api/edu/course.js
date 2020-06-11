import request from "@utils/request";

const BASE_URL = "/admin/edu/course";

// 获取讲师
export function reqGetAllCourseList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}
