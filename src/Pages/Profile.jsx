import React, { useContext } from 'react'
import { Context } from '../main';

function Profile() {

  const{isAuthenticated,loading,setLoading ,user} = useContext(Context);

  return (
    <div>
      
    </div>
  )
}

export default Profile
