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
        <title>サンプルペルソナ | AIコンテキスト生成ツール</title>
        <meta name="description" content="様々な職業・年代・性格のペルソナサンプル集。詳細情報やAI用プロンプトをご確認いただけます。" />
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