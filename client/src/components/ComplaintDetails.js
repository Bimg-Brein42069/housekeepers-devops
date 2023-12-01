import { useComplaintsContext } from '../hooks/useComplaintsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ComplaintDetails = ({ complaint }) => {
  const { dispatch } = useComplaintsContext()

  const handleClick = async () => {
    const response = await fetch('/api/complaints/' + complaint._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_COMPLAINT', payload: json})
    }
  }

  return (
    <div className="complaint-details">
      <h4>{complaint.desc}</h4>
      <p><strong>Priority: </strong>{complaint.priority}</p>
      <p>{formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default ComplaintDetails