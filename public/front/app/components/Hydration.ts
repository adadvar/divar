'use client';

import { useEffect } from 'react';
import { useGlobal } from '@/app/store/global-store';


export default function Hydrations() {
  useEffect(() => {
    useGlobal.persist.rehydrate();
  }, []);

  return null;
}