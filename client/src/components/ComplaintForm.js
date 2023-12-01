import { useState } from 'react'
import { useComplaintsContext } from '../hooks/useComplaintsContext'

const ComplaintForm = () => {
  const { dispatch } = useComplaintsContext()

  const [desc, setDesc] = useState('')
  const [priority, setPriority] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const complaint = {desc,priority}
    
    const response = await fetch('/api/complaints', {
      method: 'POST',
      body: JSON.stringify(complaint),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setDesc('')
      setPriority('')
      dispatch({type: 'CREATE_COMPLAINT', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>New Complaint</h3>

      <label>Complaint Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDesc(e.target.value)} 
        value={desc}
        className={emptyFields.includes('desc') ? 'error' : ''}
      />

      <label>Priority(higher number for higher priority):</label>
      <input 
        type="number" 
        onChange={(e) => setPriority(e.target.value)} 
        value={priority}
        className={emptyFields.includes('priority') ? 'error' : ''}
      />

      <button>Add Complaint</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ComplaintForm