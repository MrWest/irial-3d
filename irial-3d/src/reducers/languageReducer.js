import { SET_LANG_EN, SET_LANG_ES } from "../actions/types";
import _ from "lodash";
import LocalizedStrings from 'react-localization';
import strings from "../apis/languages"


const LanguageReducer = (state =  new LocalizedStrings(strings), action) => {
  switch (action.type) {
    case SET_LANG_EN:
    let newState =  new LocalizedStrings(strings) 
    newState.setLanguage('en');
      return newState;
    case SET_LANG_ES:
    let newStateEs =  new LocalizedStrings(strings) 
    newStateEs.setLanguage('es');
      return newStateEs;
    default:
      return state;
  }
};

export default LanguageReducer;
