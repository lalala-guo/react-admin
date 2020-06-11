import { reqGetSubjectList, reqGetSubsubjectList, reqUpdateSubject } from "@api/edu/subject.js";
import { GET_SUBJECT_LIST, GET_SUB_SUBJECT_LIST, UPDATE_SUBJECT } from "./contants";

// 一级分类
const getSubjectListSync = (subjectList) => ({
  type: GET_SUBJECT_LIST,
  data: subjectList,
});

export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubjectList(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response.items;
    });
  };
};

// 二级分类
const getSubsubjectListSync = (data) => ({
  type: GET_SUB_SUBJECT_LIST,
  data,
});

export const getSubsubjectList = (parentId) => {
    return (dispatch) => {
        return reqGetSubsubjectList(parentId).then((response) => {
            // console.log(response);
          dispatch(
            getSubsubjectListSync({ parentId, subSubjectList: response.items })
          );
          return response;
        });
      };
};


// 更新 
const updateSubjectSync = (subject) => ({
  type: UPDATE_SUBJECT,
  data: subject,
});

export const updateSubject = (title, id) => {
    return (dispatch) => {
        return reqUpdateSubject(title, id).then((response) => {
            // console.log(response);
          dispatch(
            updateSubjectSync({ title, _id: id  })
          );
          return { title, _id: id  };
        });
      };
};