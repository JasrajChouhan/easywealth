'use client';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams<{
    id: string;
  }>();
  return (
    <div>
      <h1>Account Page {id}</h1>
    </div>
  );
}
