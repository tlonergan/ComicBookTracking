import keys from '../core/keys';
import initialState from '../store/initialStore';

export default function comicVineReducer(state = initialState.get('book'), action){
  switch (action.type) {
    case keys.book.addComicVine.getting:
      return gettingAddBook(state, action);
    case keys.book.addComicVine.success:
      return successAddBook(state, action);
    case keys.book.addComicVine.failure:
      return failureAddBook(state, action);
    case keys.book.get.getting:
      return gettingBookList(state, action);
    case keys.book.get.success:
      return gotBookList(state, action);
    case keys.book.setSearchFilter:
      return setSearchFilter(state, action);
    case keys.book.put.getting:
      return startPutBook(state, action);
    case keys.book.put.success:
      return donePutBook(state, action);
    default:
      return state;
  }
}

function gettingAddBook(state, action){
  return state;
}

function successAddBook(state, action){
  return state;
}

function failureAddBook(state, action){
  return state;
}

function gettingBookList(state, action){
  let newState = state.set('isFetching', true);
  return newState;
}

function gotBookList(state, action){
  let newState = state.set('bookList', action.payload);
  newState = newState.set('isFetching', false);
  return newState;
}

function setSearchFilter(state, action){
  let newState = state.set('filterString', action.payload);
  return newState;
}

function startPutBook(state, action){
  let newState = state.set('isSaving', true);
  return newState;
}

function donePutBook(state, action){
  let newState = state.set('isSaving', false);
  return newState;
}
