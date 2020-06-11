import { GET_SUBJECT_LIST, GET_SUB_SUBJECT_LIST, UPDATE_SUBJECT } from './contants'

  const initSubjectList = {
    total: 0, // 总数
    items: [], // 列表数据
  };
  
  export default function subjectList(prevState = initSubjectList, action) {
    switch (action.type) {
      case GET_SUBJECT_LIST:
        // return  return {
        //     // 返回复制数据 并添加children
        //     ...subject,
        //     children: [], // 添加children属性，当前项就是可展开项，才会显示展开图标
        // };
        return {
            total: action.data.total,
            items: action.data.items.map((subject) => {
                return {
                    ...subject,
                    children: []
                }
            })
        }
        case GET_SUB_SUBJECT_LIST: // 获取二级课程分类数据
        // 将二级分类数据添加到某个一级分类数据children上~
        const { parentId, subSubjectList } = action.data;
        // console.log(action.data);
        
        return {
          total: prevState.total,
          items: prevState.items.map((subject) => {
              if (subject._id === parentId) {
                  subject.children = subSubjectList;
                //   console.log(subject.children);
            }
            return subject;
           
          }),
        };
      case UPDATE_SUBJECT:
        return {
          total: prevState.total,
          items: prevState.items.map((subject) => {
            // 一级分类  如果id一致  就分别展开原数据 和新数据  进而新数据可以覆盖掉原数据
              if (subject._id === action.data._id) {
                  return{
                    ...subject,
                    ...action.data
                  }
              }

              // 二级分类
              subject.children = subject.children.map((item) => {
                if (item._id === action.data._id) {
                  return{
                    ...item,
                    ...action.data
                  }
                }
                return item;
              })
            return subject;
          })
        }
      default:
        return prevState;
    }
  }
  