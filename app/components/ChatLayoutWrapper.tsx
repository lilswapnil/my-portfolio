"use client";

import { usePathname } from 'next/navigation';
import AskScotty from './AskScotty/page';

export default function ChatLayoutWrapper() {
  const pathname = usePathname();

  if (pathname === '/404') {
    return null;
  }

  return <AskScotty question="" />;
}