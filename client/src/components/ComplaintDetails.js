import { useAuthContext } from '../hooks/useAuthContext'
import { useComplaintsContext } from '../hooks/useComplaintsContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ComplaintDetails = ({ complaint }) => {
  const { dispatch } = useComplaintsContext()
  const { user } = useAuthContext()
  const handleClick = async () => {
    if(!user){
      return 
    }
    const response = await fetch('/api/complaints/' + complaint._id, {
      method: 'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_COMPLAINT', payload: json})
    }
  }

  const handleClick2 = async () => {
    if(!user){
      return 
    }
    const response = await fetch('/api/complaints/' + complaint._id, {
      method: 'PATCH',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'UPDATE_COMPLAINT', payload: json})
    }
  }

  if(!user.isAdmin){
    if(complaint.stats === 'Resolving'){
      return (
        <div className="complaint-details">
          <h4>{complaint.desc}</h4>
          <p><strong>Priority: </strong>{complaint.priority}</p>
          <p><strong>Status: </strong>{complaint.stats}</p>
          <p>{formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</p>
          <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
          <span2 className="material-symbols-outlined" onClick={handleClick2}>update</span2>
        </div>
      )
    }
    return (
      <div className="complaint-details">
        <h4>{complaint.desc}</h4>
        <p><strong>Priority: </strong>{complaint.priority}</p>
        <p><strong>Status: </strong>{complaint.stats}</p>
        <p>{formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
  }
  if(complaint.stats === 'Resolved'){
    return (
      <div className="complaint-details">
        <h4>{complaint.desc}</h4>
        <p><strong>Priority: </strong>{complaint.priority}</p>
        <p><strong>Status: </strong>{complaint.stats}</p>
        <p>{formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
  }
  if(complaint.stats === 'Sent'){
    return (
      <div className="complaint-details">
        <h4>{complaint.desc}</h4>
        <p><strong>Priority: </strong>{complaint.priority}</p>
        <p><strong>Status: </strong>{complaint.stats}</p>
        <p>{formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick2}>update</span>
      </div>
    )
  }
  return (
    <div className="complaint-details">
      <h4>{complaint.desc}</h4>
      <p><strong>Priority: </strong>{complaint.priority}</p>
      <p><strong>Status: </strong>{complaint.stats}</p>
      <p>{formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</p>
    </div>
  )
}

export default ComplaintDetails