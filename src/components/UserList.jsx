import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import tunisianProfiles from "../tunisianProfiles";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [attempt, setAttempt] = useState(0); // permet de réessayer

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(API_URL)
      .then((response) =>
        // On garde les données de l'API, mais on remplace identité et coordonnées par des profils tunisiens
        setUsers(response.data.map((u) => {
          const t = tunisianProfiles[u.id];
          return t ? { ...u, name: t.name, email: t.email, phone: t.phone, address: { ...u.address, city: t.city }, company: { ...u.company, name: t.company } } : u;
        }))
      )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [attempt]);

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <p className="state">Chargement des contacts…</p>;
  if (error)
    return (
      <div className="state error">
        <p>Les contacts n'ont pas pu être récupérés. Vérifiez votre connexion internet.</p>
        <button onClick={() => setAttempt(attempt + 1)}>Réessayer</button>
      </div>
    );

  return (
    <section>
      <div className="toolbar">
        <input type="search" placeholder="Rechercher un contact par nom…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <p className="count">
          <b>{users.length}</b> contacts au total
          {search && <> · <b>{filtered.length}</b> trouvé{filtered.length > 1 ? "s" : ""}</>}
        </p>
      </div>
      {filtered.length === 0 ? (
        <p className="state">Aucun contact ne correspond à « {search} ».</p>
      ) : (
        <div className="grid">
          {filtered.map((u) => (
            <UserCard key={u.id} id={u.id} name={u.name} email={u.email} phone={u.phone} city={u.address.city} company={u.company.name} />
          ))}
        </div>
      )}
    </section>
  );
}
