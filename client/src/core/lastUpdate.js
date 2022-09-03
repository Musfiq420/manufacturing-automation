import React, { useEffect, useState } from 'react'

const LastUpdate = () => {
    const [time, setTime] = useState(0);
  
  useEffect(() => {
    setTime(Date().toLocaleString());
  },[])

    return (
    <div><p style={{fontSize:'9px'}}>Last Refresh: {time}</p></div>
  )
}

export default LastUpdate