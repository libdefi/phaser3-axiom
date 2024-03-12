'use client';
import AdvanceStepButton from '@/components/ui/AdvanceStepButton';
import Title from '@/components/ui/Title';
import CodeBox from '@/components/ui/CodeBox';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { EventBus } from './EventBus';

export default async function Home() {
  let compiledCircuit;
  try {
    compiledCircuit = require('../../axiom/data/compiled.json');
  } catch (e) {
    console.log(e);
  }
  if (compiledCircuit === undefined) {
    return (
      <>
        <div>Compile circuit first by running in the root directory of this project:</div>
        <CodeBox>{'npx axiom compile circuit app/axiom/swapEvent.circuit.ts'}</CodeBox>
      </>
    );
  }

  const [gameover, setGameOver] = useState(false);

  useEffect(() => {
    setGameOver(false);
  }, []);

  EventBus.on('gameover', (data: any) => {
    setGameOver(true);
  });

  return (
    <>
      <Title>Crypto Run</Title>
      {!gameover ? (
        <div className='text-center'>
          {/* Players can revive through transactions on{' '}
          <Link href='https://app.uniswap.org/swap' target='_blank'>
            Uniswap
          </Link>{' '}
          and extend their score by utilizing verification on Axiom, <br /> */}
          Get another life by Swap on Uniswap! <br />
          Aiming "Top High Score" for the prize in the daily competition.
        </div>
      ) : (
        <div className='text-center'>
          Go{' '}
          <Link href='https://app.uniswap.org/swap' target='_blank'>
            Uniswap
          </Link>{' '}
          and Swap Uni-WETH. You can continue your game by reviving through transactions on Uniswap.
        </div>
      )}

      {gameover ? <AdvanceStepButton label='Generate Proof for Reborn' href={'/check'} /> : null}
    </>
  );
}
