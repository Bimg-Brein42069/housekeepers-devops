import { useEffect } from "react"
import { useComplaintsContext } from "../hooks/useComplaintsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ComplaintDetails from "../components/ComplaintDetails"
import ComplaintForm from "../components/ComplaintForm"

const Home = () => {
  const { complaints, dispatch } = useComplaintsContext()
  const {user} = useAuthContext()
  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch('/api/complaints', {
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_COMPLAINTS', payload: json})
      }
    }
    if(user){
      fetchComplaints()
    }
  }, [dispatch,user])

  return (
    <div className="home">
      <div className="complaints">
        {complaints && complaints.map(complaint => (
          <ComplaintDetails complaint={complaint} key={complaint._id} />
        ))}
      </div>
      <ComplaintForm />
    </div>
  )
}

export default Home