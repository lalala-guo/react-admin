import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";

// 获取课时列表
export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  });
}

// 新增课时
export function reqAddLesson({ chapterId, title, free, video }) {
  return request({
    url: `${BASE_URL}/save`,
    method:"POST",
    data: {
      chapterId,
      title,
      free,
      video,
    },
  });
}
