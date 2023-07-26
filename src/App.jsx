import './App.scss';
import Header from './Components/Header/Header';
import CardList from './Components/CardList/CardList';

function App() {

  return (
    <div className="App">
      <Header />
      <main className='main'>
        <CardList />
      </main>
    </div>
  );
}

export default App;