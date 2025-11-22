import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import PersonaList from '../../components/samples/PersonaList';
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

interface SamplesPageProps {
  personas: Persona[];
}

const SamplesPage: React.FC<SamplesPageProps> = ({ personas }) => {
  return (
    <>
      <Head>
        <title>コンテキストコレクション | ユーザーインタビュー用</title>
        <meta name="description" content="ユーザーインタビューに使える高品質なコンテキスト集。職種・状況別のプロファイルとプロンプトを提供。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-50">
        <PersonaList personas={personas} />
      </main>
    </>
  );
};

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

export default SamplesPage;
