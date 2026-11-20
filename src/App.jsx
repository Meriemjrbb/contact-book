import UserList from "./components/UserList";

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>ContactBook</h1>
        <p>Votre répertoire, chargé en direct depuis l'API JSONPlaceholder.</p>
      </header>
      <UserList />
    </div>
  );
}
