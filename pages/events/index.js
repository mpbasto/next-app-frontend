import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { baseUrl } from "utils";

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to display</h3>}

      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/events?populate=*&_sort=date:ASC`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
