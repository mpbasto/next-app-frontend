import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { fetchQuery } from "utils";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.data.length === 0 && <h3>No events to display</h3>}

      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      {events.data.length > 0 && (
        <Link href="/events" className="btn-secondary">
          View all events
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetchQuery("events");
  return {
    props: { events: res },
  };
}
