import keys from '../core/keys';
import initialState from '../store/initialStore';

export default function comicVineReducer(state = initialState.get('book'), action){
  switch (action.type) {
    case key.book.comicVine.getting:
      return gettingAddBook(state, action);
    case key.book.comicVine.success:
      return successAddBook(state, action);
    case key.book.comicVine.failure:
      return failureAddBook(state, action);
    case key.book.bookList.getting:
      return gettingBookList(state, action);
    case key.book.bookList.success:
      return gotBookList(state, action);
    case key.book.setSearchFilter:
      return setSearchFilter(state, action);
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
  return state;
}

function gotBookList(state, action){
  return state;
}

function setSearchFilter(state, action){
  let newState = state.set('filterString', action.payload);
  return newState;
}
