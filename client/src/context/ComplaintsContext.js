import { createContext, useReducer } from 'react'

export const ComplaintContext = createContext()

export const ComplaintReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMPLAINTS':
      return { 
        complaints: action.payload 
      }
    case 'CREATE_COMPLAINT':
      return { 
        complaints: [action.payload, ...state.complaints].sort((a,b) =>{
          if(a.priority === b.priority)
            return a.createdAt > b.createdAt ? 1 : -1
          return b.priority-a.priority
        }) 
      }
    case 'DELETE_COMPLAINT':
      return { 
        complaints: state.complaints.filter(w => w._id !== action.payload._id) 
      }
    case 'UPDATE_COMPLAINT':
      return { 
        complaints: [action.payload,state.complaints.filter(w => w._id !== action.payload._id)].sort((a,b) =>{
          if(a.priority === b.priority)
            return a.createdAt-b.createdAt
          return b.priority-a.priority
        }) 
      }  
    default:
      return state
  }
}

export const ComplaintContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ComplaintReducer, { 
    complaints: null
  })
  
  return (
    <ComplaintContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ComplaintContext.Provider>
  )
}