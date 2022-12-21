import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Search.module.css";

export default function Search() {
  const [term, setTerm] = useState("");
  const router = useRouter();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };
  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(evt) => setTerm(evt.target.value)}
          placeholder="Search events, performers, venues..."
        />
      </form>
    </div>
  );
}
