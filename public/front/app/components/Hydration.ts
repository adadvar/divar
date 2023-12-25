'use client';

import { useEffect } from 'react';
import { useAuth } from '@/app/store/global-store';


export default function Hydrations() {
  useEffect(() => {
    useAuth.persist.rehydrate();
  }, []);

  return null;
}