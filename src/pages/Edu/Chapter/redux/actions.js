import { reqGetAllCourseList } from "@api/edu/course.js";
import {
  GET_ALL_COURSE_LIST,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
  BATCH_REMOVE_LESSON_LIST,
  BATCH_REMOVE_CHAPTER_LIST,
} from "./constants";
import {
  reqGetChapterList,
  reqBatchRemoveChapterList,
} from "@api/edu/chapter.js";
import { reqGetLessonList, reqBatchRemoveLessonList } from "@api/edu/lesson.js";

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
  return (dispatch) => {
    return reqGetLessonList(chapterId).then((response) => {
      dispatch(getLessonListSync({ chapterId, lessons: response }));
      return response;
    });
  };
};

// 批量删除课时
const batchRemoveLessonListSync = (idList) => ({
  type: BATCH_REMOVE_LESSON_LIST,
  data: idList,
});

export const batchRemoveLessonList = (idList) => {
  return (dispatch) => {
    return reqBatchRemoveLessonList(idList).then((response) => {
      dispatch(batchRemoveLessonListSync(idList));
      return idList;
    });
  };
};

// 批量删除章节
const batchRemoveChapterListSync = (idList) => ({
  type: BATCH_REMOVE_CHAPTER_LIST,
  data: idList,
});

export const batchRemoveChapterList = (idList) => {
  return (dispatch) => {
    return reqBatchRemoveChapterList(idList).then((response) => {
      dispatch(batchRemoveChapterListSync(idList));
      return idList;
    });
  };
};
