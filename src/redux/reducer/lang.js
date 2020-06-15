import { CHANGE_LANGUAGE} from '../constants/lang'

const initLang = window.navigator.language === "en" ? "en" : "zh" 
export default function language(prevState=initLang, action){
    switch (action.type) {
        case CHANGE_LANGUAGE:
            console.log(action.data);
            
            return action.data
        default:
            return prevState
    }
}