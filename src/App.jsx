// App.js

import React, { useEffect, useState } from 'react';
import ProductList from './Components/ItemList';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from './supabaseClient'; // Import the Supabase client


const App = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <>
        <div className='w-full text-center text-xl'>
          <div>Supermercado app</div>
          <div>Login pls</div>
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        </div>
      </>
    )
  } else {
    return (
      <div className='w-full'>
        <Navbar session={session?.user} />
        <h1 className='text-white'>Supermercado</h1>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ProductList />
        </div>
      </div>
    );
  }

};

export default App;
