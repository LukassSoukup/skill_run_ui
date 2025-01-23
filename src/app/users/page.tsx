import React from 'react'
import { cookies } from 'next/headers'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface User {
  id: string,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string
}

const UsersPage = async () => { 
  // fake API for testing https://jsonplaceholder.typicode.com/
  const res  = await fetch('https://jsonplaceholder.typicode.com/users', {cache: 'no-store'});
  const users: User[] = await res.json();
  // Ensure dynamic rendering be either using fetching and disabling caching
  // or
  // import and use one of the dynamic components = cookies or URL params
  const cookie: ReadonlyRequestCookies = await cookies();
  const coo: RequestCookie | undefined = cookie.get("yop");
  console.log(coo);

  return (
    <>
    <div>{new Date().toLocaleTimeString()}</div>
    <h1>Users</h1>
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {
        users.map(user => 
          <tr key={user.id}>
            <td><i>{user.name}</i></td>
            <td>{user.email}</td>
          </tr>
        )}
      </tbody>
    </table>
    </>
  )
}

export default UsersPage