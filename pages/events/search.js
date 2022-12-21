import qs from "qs";
import { useRouter } from "next/router";
import { baseUrl } from "utils";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/events">
        <FaArrowLeft /> Back
      </Link>
      <h1>Search results for &quot;{router.query.term}&quot;</h1>
      {events.length === 0 && <h3>No events to display</h3>}

      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $containsi: term } },
        { performers: { $containsi: term } },
        { description: { $containsi: term } },
        { venue: { $containsi: term } },
      ],
    },
  });
  const res = await fetch(
    `${baseUrl}/events?${query}&populate=*&_sort=date:ASC`
  );
  const events = await res.json();

  return {
    props: { events },
  };
}
