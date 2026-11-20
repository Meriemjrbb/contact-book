const COLORS = ["#0f766e", "#e76f51", "#3a86ff", "#8338ec", "#d62828", "#2a9d8f", "#f77f00", "#4361ee"];

// Les infos du contact arrivent par les props
export default function UserCard({ name, email, phone, city, company, id }) {
  const initials = name.split(" ").filter((w) => /^[A-Za-zÀ-ÿ]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
  return (
    <article className="card">
      <div className="avatar" style={{ background: COLORS[id % COLORS.length] }} aria-hidden="true">{initials}</div>
      <div className="body">
        <h3>{name}</h3>
        <p className="company">{company}</p>
        <ul>
          <li><span>Email</span><a href={`mailto:${email}`}>{email}</a></li>
          <li><span>Tél.</span><a href={`tel:${phone.split(" x")[0]}`}>{phone.split(" x")[0]}</a></li>
          <li><span>Ville</span>{city}</li>
        </ul>
      </div>
    </article>
  );
}
