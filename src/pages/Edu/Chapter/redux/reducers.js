import {
  GET_ALL_COURSE_LIST,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
  BATCH_REMOVE_LESSON_LIST,
  BATCH_REMOVE_CHAPTER_LIST,
} from "./constants";

const initChapter = {
  allCourseList: [],
  chapters: {
    total: 0,
    items: [],
  },
};

export default function chapter(prevState = initChapter, action) {
  switch (action.type) {
    case GET_ALL_COURSE_LIST:
      // console.log(action);
      return {
        ...prevState,
        allCourseList: action.data,
      };
    case GET_CHAPTER_LIST:
      return {
        ...prevState,
        chapters: {
          total: action.data.total,
          items: action.data.items.map((chapter) => {
            return {
              ...chapter,
              children: [],
            };
          }),
        },
      };
    case GET_LESSON_LIST:
      return {
        ...prevState,
        chapters: {
          total: prevState.chapters.total,
          items: prevState.chapters.items.map((chapter) => {
            // 判断
            if (chapter._id === action.data.chapterId) {
              return {
                ...chapter,
                children: action.data.lessons,
              };
            }
            return chapter;
          }),
        },
      };
    case BATCH_REMOVE_LESSON_LIST:
      return {
        ...prevState,
        chapters: {
          total: prevState.chapters.total,
          items: prevState.chapters.items.map((chapter) => {
            let children = chapter.children;
            // 判断 是否有children 属性  并且 children 是否有值
            if (children && children.length) {
              // 如果有 就过滤掉 要删除的课时数据
              children = children.filter((item) => {
                //  如果没有 就返回
                return action.data.indexOf(item._id) === -1;
              });
            }
            return {
              ...chapter,
              children,
            };
          }),
        },
      };
    case BATCH_REMOVE_CHAPTER_LIST:
      return {
        ...prevState,
        chapters: {
          total: prevState.chapters.total,
          items: prevState.chapters.items.map((chapter) => {
            let children = chapter.children;
            // 判断 是否有children 属性  并且 children 是否有值
            if (children && children.length) {
              // 如果有 就过滤掉 要删除的课时数据
              children = children.filter((item) => {
                //  如果没有 就返回
                return action.data.indexOf(item._id) === -1;
              });
            }
            return {
              ...chapter,
              children,
            };
          }),
        },
      };
    default:
      return prevState;
  }
}
