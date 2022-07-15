const initialState = {
  tasks: []
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return { ...state, tasks: [...state.tasks, action.payload] };;
        case "TASK_CHECKED":
            return {...state, tasks: state.tasks.map(task => task.id === action.payload ? {...task, done: !task.done} : { ...task })};
        case "DELETE_TASK":
            return {...state, tasks: state.tasks.filter(task => task.id !== action.payload)}
        case "EDIT_TASK":
            return {...state, tasks: state.tasks.map(task => task.id === action.id ? { ...task, taskName: action.value} : { ...task })}
        case "DELETE_CHECKED_TASKS":
            return {...state, tasks: state.tasks.filter(task => !task.done)}
        default:
            return state;
    }
};
