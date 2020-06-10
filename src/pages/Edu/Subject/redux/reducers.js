import { GET_SUBJECT_LIST, GET_SUB_SUBJECT_LIST } from './contants'

  const initSubjectList = {
    total: 0, // 总数
    items: [], // 列表数据
  };
  
  export default function subjectList(prevState = initSubjectList, action) {
    switch (action.type) {
      case GET_SUBJECT_LIST:
        return action.data
        case GET_SUB_SUBJECT_LIST: // 获取二级课程分类数据
        // 将二级分类数据添加到某个一级分类数据children上~
        const { parentId, subSubjectList } = action.data;
        console.log(subSubjectList);
        
        return {
          total: prevState.total,
          items: prevState.items.map((subject) => {
              if (subject._id === parentId) {
                  subject.children = subSubjectList;
                  console.log(subject.children);
            }
            return subject;
          }),
        };
      default:
        return prevState;
    }
  }
  