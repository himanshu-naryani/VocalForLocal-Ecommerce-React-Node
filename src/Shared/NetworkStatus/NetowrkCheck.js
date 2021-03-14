import React, { useState } from 'react'

const CheckOnlineStatus = () => {
  const { isOnline, setOnline } = useState();

  React.useEffect(() => {

    const goOnline = function (event) {
      setOnline(true);
    }
    const goOffline = function (event) {
      setOnline(false);
    }

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    }
  }, [])

  return isOnline
}

export default CheckOnlineStatus