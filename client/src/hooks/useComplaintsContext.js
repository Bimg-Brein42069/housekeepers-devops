import { ComplaintContext } from "../context/ComplaintsContext"
import { useContext } from "react"

export const useComplaintsContext = () => {
  const context = useContext(ComplaintContext)

  if(!context) {
    throw Error('useComplaintsContext must be used inside a ComplaintContextProvider')
  }

  return context
}