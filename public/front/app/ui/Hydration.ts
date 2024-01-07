'use client';

import { useEffect } from 'react';
import { useAuth, useGlobal } from '@/app/store/global-store';


export default function Hydrations() {
  useEffect(() => {
    useAuth.persist.rehydrate();
    useGlobal.persist.rehydrate();
  }, []);

  return null;
}