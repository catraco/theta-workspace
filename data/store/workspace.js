import { createSlice } from "@reduxjs/toolkit"
import { WORKSPACE_DATA } from "@/data/modules"

const s = createSlice({

    name: WORKSPACE_DATA.name,
    initialState: null,
    reducers: {
        LOAD() {
            return localStorage.getItem(WORKSPACE_DATA.name) ?
                JSON.parse(localStorage.getItem(WORKSPACE_DATA.name)) : WORKSPACE_DATA.default
        },
        SAVE(state) {
            localStorage.setItem(WORKSPACE_DATA.name, JSON.stringify(state))
        },
        ADD(state, action) {
            state.workspaces = [
                ...state.workspaces,
                {
                    ...WORKSPACE_DATA.workspace,
                    id: action.payload.id
                }
            ]
        },
        REMOVE(state, action) {
            state.workspaces = state.workspaces.filter(ws => {
                if ( ws.id !== action.payload.id ) {
                    return ws
                } else if(ws.current) {
                    state.currentWorkspace = null
                }
            })
        },
        CURRENT(state, action) {
            state.currentWorkspace = action.payload.id
            state.workspaces = state.workspaces.map(ws => {
                return ws.id === action.payload.id ?
                    { ...ws, current: true }
                    : { ...ws, current: false }
            })
        },
        UPDATE(state, action) {
            state.workspaces = state.workspaces.map(ws => {
                return ws.id === action.payload.id ?
                    { ...ws, ...action.payload.props }
                    : ws
            })
        },
        CLEAN_CURRENT(state) {
            state.workspaces = state.workspaces.map(ws => {
                return ws.current ?
                    { ...ws, tools: [] }
                    : ws
            })
        },
        CLEAN_ALL(state) {
            state.workspaces = state.workspaces.map(ws => {
                return { ...ws, tools: [] }
            })
        },
        ADD_TOOL(state, action) {
            const tool = {
                ...WORKSPACE_DATA.tool,
                id: action.payload.id,
                type: action.payload.type,
                frame: action.payload.frame,
                posX: action.payload.posX,
                posY: action.payload.posY
            }
            state.workspaces = state.workspaces.map(ws => {
                return ws.current ?
                    { ...ws, tools: [...ws.tools, tool] }
                    : ws
            })
        },
        REMOVE_TOOL(state, action) {
            state.workspaces = state.workspaces.map(ws => {
                return ws.current ?
                    { ...ws, tools: ws.tools.filter(tl => tl.id !== action.payload.id) }
                    : ws
            })
        },
        UPDATE_TOOL(state, action) {
            state.workspaces = state.workspaces.map(ws => {
                return ws.current ?
                    {
                        ...ws, tools: ws.tools.map(tl => {
                            return tl.id === action.payload.id ?
                                { ...tl, ...action.payload.props }
                                : tl
                        })
                    }
                    : ws
            })
        },
    }

})

const WORKSPACE_ACTIONS = s.actions
export { WORKSPACE_ACTIONS }
export default s.reducer