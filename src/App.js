
import AdminRoutes from './Router/AdminRoutes';
import HomePageRoutes from './Router/homepageRoutes';
import Home from './Router/Home';
import Main from '../src/Components/UserSignin/Main';
import ExplorePageRoutes from './Router/ExplorePageRoutes';
import SellerRoutes from './Router/SellerRoutes';
import ProfileRoutes from './Router/ProfileRoutes';
import CartRoutes from './Router/CartPageRoutes'
import ProductInfoPageRoutes from './Router/ProductInfoPageRoutes';
import firebase from './Components/firebase/Firebase'
import React, { useState } from 'react'

import OfflineComponent from './Shared/OfflineComponent/OfflineComponent'

function App() {
      React.useEffect(() => {
            const msg = firebase.messaging();
            msg.requestPermission().then(() => {
                  return msg.getToken();
            }).then((data) => {
                  console.warn("token", data);
            })
      })

      const [online, setOnline] = useState(false)
      const goOnline = function (event) {
            setOnline(false);
      }
      const goOffline = function (event) {
            setOnline(true);
      }

      window.addEventListener('offline', goOffline);
      window.addEventListener('online', goOnline);
      return (

            <div className="App">

                  {!navigator.onLine && <OfflineComponent />}
                  <Home />
                  <Main />
                  <SellerRoutes />
                  <AdminRoutes />
                  <HomePageRoutes></HomePageRoutes>
                  <ExplorePageRoutes />
                  <ProfileRoutes />
                  <CartRoutes />
                  <ProductInfoPageRoutes />

            </div>
      )
}

export default App;
