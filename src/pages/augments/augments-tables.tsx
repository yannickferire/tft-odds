import { type NextPage } from "next";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AugmentsTables: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/augments/the-golden-egg');
  }, [router]);

  return null;
}

export default AugmentsTables;
