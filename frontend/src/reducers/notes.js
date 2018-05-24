const initialState = [];


export default function notes(state = initialState, action) {
  let noteList = state.slice();

  switch (action.type) {

    case 'ADD_NOTE':
      return [...state, {
        text: action.text
      }];

    case 'UPDATE_NOTE':
      let noteToUpdate = noteList[action.id]
      noteToUpdate.text = action.text;
      console.log(noteToUpdate)
      noteList.splice(action.id, 1, noteToUpdate);
      return noteList;

    case 'DELETE_NOTE':
      noteList.splice(action.id, 1);
      return noteList;

    case 'FETCH_NOTES':
      return [...state, ...action.notes];

    default:
      return state;
  }
}
