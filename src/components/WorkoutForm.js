import { useState } from 'react'
import './WorkoutForm.css'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyfields, setemptyfields] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, load, reps }
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setemptyfields(json.emptyfields)
        }
        if (response.ok) {
            setLoad('')
            setReps('')
            setTitle('')
            setError(null)
            setemptyfields([])
            console.log('new work added', json)
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }
    return (
        <>
            <form className='create' onSubmit={handleSubmit}>
                <h3>Add a new Workout</h3>

                <label>Exercise Title:</label>
                <input
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyfields.includes('title') ? 'error' : ''}></input>

                <label>Load (in Kg):</label>
                <input
                    type='number'
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                    className={emptyfields.includes('load') ? 'error' : ''}></input>

                <label>Reps:</label>
                <input
                    type='number'
                    onChange={(e) => setReps(e.target.value)} value={reps}
                    className={emptyfields.includes('reps')?'error':''}></input>
                <div className='buttonShift'>
                    <button>Add Workout</button>
                </div>
                {error && <div className='error'>{error}</div>}
            </form>
        </>
    )
}


export default WorkoutForm