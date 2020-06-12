import { reqGetAllCourseList } from "@api/edu/course.js";
import { GET_ALL_COURSE_LIST, GET_CHAPTER_LIST, GET_LESSON_LIST } from "./constants";
import { reqGetChapterList } from "@api/edu/chapter.js"
import { reqGetLessonList } from "@api/edu/lesson.js"

//  所有课程
const getAllCourseListSync = (courseList) => ({
  type: GET_ALL_COURSE_LIST,
  data: courseList,
});

export const getAllCourseList = () => {
  return (dispatch) => {
    return reqGetAllCourseList().then((response) => {
      dispatch(getAllCourseListSync(response));
      // console.log(response);
      return response;
    });
  };
};
//  获取章节
const getChapterListSync = (chapters) => ({
  type: GET_CHAPTER_LIST,
  data: chapters,
});

export const getChapterList = ({ page, limit, courseId }) => {
  return (dispatch) => {
    return reqGetChapterList({ page, limit, courseId }).then((response) => {
      dispatch(getChapterListSync(response));
      return response;
    });
  };
};
// 获取课时
const getLessonListSync = (data) => ({
  type: GET_LESSON_LIST,
  data,
});

export const getLessonList = (chapterId) => {
  console.log(chapterId);
  
  return (dispatch) => {
    return reqGetLessonList(chapterId).then((response) => {
      dispatch(getLessonListSync({chapterId, lessons: response}));
      return response;
    });
  };
};