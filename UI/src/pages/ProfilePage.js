import React from 'react'
import { useAuth } from "../contextPage/Context";


function ProfilePage() {
  const { currentUser } = useAuth()

  return (<>
    <div>ProfilePage</div>
    <div>
{currentUser && <pre> {JSON.stringify(currentUser, null, 2)}</pre>}
</div>
  </>
  )
}

export default ProfilePage