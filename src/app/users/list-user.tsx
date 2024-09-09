'use client';

import { User, getUsers } from '@/app/utils/api-requests';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import Loading from './loading';
import ErrorPage from './error';

export default function ListUsers() {

  const { isLoading,error,data } = useQuery({
    queryKey: ['list-user'],
    queryFn: async () => {
      // throw new Error('Simulated error for testing');
      const response = await getUsers();
 
     return response; // 只返回 body 部分
   },
    staleTime: 5 * 1000,
  });

  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <ErrorPage message={(error as Error).message}/>;
  }

  return (
    <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>


      {
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 20,
          }}
        >
          {data?.map((user) => (
            <div
              key={user.id}
              style={{ border: '1px solid #ccc', textAlign: 'center' }}
            >
              <Image
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                width={180}
                height={180}
              />
              <h3>{user.name}</h3>
              <h3>{user.email}</h3>
            </div>
          ))}
        </div>
      }
    </main>
  );
}
