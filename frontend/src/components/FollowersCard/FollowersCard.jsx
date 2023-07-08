
import './FollowersCard.css'

import User from '../User/User'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { getAllUser } from '../../api/UserRequestApi'
const FollowersCard = () => {
    const [persons, setPersons] = useState([])
    const { user } = useSelector((state) => state.authReducer.authData)
    
    useEffect(() => {
        const fetPersons = async () => {
            const { data } = await getAllUser()
            setPersons(data)
            console.log(data);
        }
        fetPersons()
    },[])
  return (
    <div className="FollowersCard">
        <h3>People you may know</h3>

          {persons.map((person, id) => {
              if (person._id !== user._id) {
                  return(
                      <User person={person} key={id} />
                  )
            }
        })}
    </div>
  )
}

export default FollowersCard