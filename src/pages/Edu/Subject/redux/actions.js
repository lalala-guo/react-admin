import { reqGetSubjectList, reqGetSubsubjectList } from "@api/edu/subject.js";
import { GET_SUBJECT_LIST, GET_SUB_SUBJECT_LIST } from "./contants";

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
