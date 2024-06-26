import React from 'react';
import { AbButton, AbCard, AbOptionGroup, AbOptionsGroup } from '@pedropadilhaportella/ds-alurabooks';
import './App.css';

function App() {
  const options: AbOptionGroup[] = [
      {
        id: 1,
        title: 'React com Hooks',
        body: 'Aprenda React de uma forma diferente e inovadora',
        footer: 'R$ 19,99',
      },
      {
        id: 2,
        title: 'Angular',
        body: 'Aprenda Angular, um dos frameworks frontend mais famosos',
        footer: 'R$ 19,99',
      },
      {
        id: 3,
        title: 'NodeJs',
        body: 'Aprenda NodeJs e trabalhe com Javascript no backend',
        footer: 'R$ 19,99',
      },
    ]
  

  return (
    <div>
      <AbCard>
        <h1>Selecione um curso</h1>
        <AbOptionsGroup options={options} />
        <AbButton text='Comprar' type='secondary' />
      </AbCard>
    </div>
  );
}

export default App;
