import React, { useState, useMemo, useCallback } from 'react';

// composant Button non pure. Ajouter React.memo pour le rendre pure
const Button = function({onClick}) {
  console.log('<Button> render');
  return <button onClick={onClick}>Mon bouton</button>
};
// composant Button pure
const ButtonMemo = React.memo(function({onClick}) {
  console.log('<Button> render');
  return <button onClick={onClick}>Mon bouton</button>
});

function App() {
  const [count, setCount] = useState(0);

  // pas optimisé. React considère que la fonction est différente à chaque rendu
  const handleClick = function () {
    alert('Bonjour');
  };
  // optimisé. On mémorise la fonction avec useMemo
  const handleClickMemo = useMemo(function () {
    return function () {
      alert('Bonjour');
    }
  }, []);
  // optimisé. On mémorise la fonction avec useCallback, version raccourcie de useMemo
  const handleClickCallback = useCallback(function () {
    alert('Bonjour');
  }, []);

  return (
    <div className="App">
      <Button onClick={handleClick}></Button>
      <button onClick={() => setCount(c => c + 1)}>Incrémenter {count}</button>
    </div>
  );
}

export default App;
