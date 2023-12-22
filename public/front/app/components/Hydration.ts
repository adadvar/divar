'use client';

import { useEffect } from 'react';
import { useGlobal } from '../src/global-store';


export default function Hydrations() {
  useEffect(() => {
    useGlobal.persist.rehydrate();
  }, []);

  return null;
}