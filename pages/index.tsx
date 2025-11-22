import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import PersonaList from '../components/samples/PersonaList';
import fs from 'fs';
import path from 'path';

interface Persona {
  id: string;
  name: string;
  age: number;
  occupation: string;
  description: string;
  image: string;
  tags: string[];
}

interface HomeProps {
  personas: Persona[];
}

export default function Home({ personas }: HomeProps) {
  return (
    <>
      <Head>
        <title>Context Collection | ユーザーインタビュー用コンテキスト集</title>
        <meta name="description" content="ユーザーインタビューがすぐに始められる高品質なコンテキストコレクション。職種・状況別に整理されたプロファイルとプロンプトを提供。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-50">
        <PersonaList personas={personas} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const filePath = path.join(process.cwd(), 'samples', 'personas-list.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const personas: Persona[] = JSON.parse(jsonData);

    return {
      props: {
        personas,
      },
    };
  } catch (error) {
    console.error('Failed to load personas data:', error);
    return {
      props: {
        personas: [],
      },
    };
  }
};
