export default function (state, action) {
  switch (action.type) {
    case 'FETCH_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'ADDED_TASK':
      return {
        ...state,
        tasks: [{ ...action.payload }, ...state.tasks],
      };
    case 'DELETED_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case 'TOGGLE_DONE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                done: !task.done,
              }
            : task
        ),
      };
    case 'SELECTED_TASK':
      return {
        ...state,
        selectedTask: action.payload,
      };
    case 'UPDATED_TASK':
      return {
        ...state,

        tasks: state.tasks.map((task) =>
          task.id === state.selectedTask.id ? action.payload : task
        ),
        selectedTask: null,
      };
    default:
      return state;
  }
}
