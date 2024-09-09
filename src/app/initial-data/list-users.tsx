'use client';

import { User, getUsers } from '../utils/api-requests';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

export default function ListUsers({ users }: { users: User[] }) {

  const { data } = useQuery({
    queryKey: ['initial-users'],
    queryFn: () => getUsers(),
    initialData: users,
    staleTime: 5 * 1000,
  });

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
          {data.map((user) => (
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
            </div>
          ))}
        </div>
      }
    </main>
  );
}
