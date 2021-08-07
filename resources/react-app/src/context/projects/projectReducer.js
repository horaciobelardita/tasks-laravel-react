

export default function (state, action) {
    switch (action.type) {
        case 'SHOW_FORM':
            return {
                ...state,
                newProject: true
            }
        case 'HIDE_FORM':
            return {
                ...state,
                newProject: false
            }
        case 'PROJECTS_FETCHED':
            return {
                ...state,
                projects: action.payload
            }
        case 'ADD_PROJECT':
            const len = state.projects.length
            const id = len > 0 ? state.projects[ len - 1].id + 1 : 1
            return {
                ...state,
                projects: [...state.projects, { ...action.payload, id }],
                newProject: false
            }
        case 'SELECTED_PROJECT':
            return {
                ...state,
                selectedProject: state.projects.find(p => p.id === action.payload)
            }
        case 'PROJECT_DELETED':
            return {
                ...state,
                selectedProject: null,
                projects: state.projects.filter(p => p.id !== action.payload)
            }
        default:
            return state;
    }
}
