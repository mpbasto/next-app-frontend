import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt, FaTimes, FaArrowLeft } from "react-icons/fa";
import { fetchQuery } from "@/utils";

const DATE_OPTIONS = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function EventPage({ evt }) {
  const event_data = evt.data[0].attributes;

  const deleteEvent = (e) => {
    console.log("delete");
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.data[0].id}`}>
            <FaPencilAlt /> Edit event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete event
          </a>
        </div>
        <span>
          {new Date(event_data.date).toLocaleDateString("en-GB", DATE_OPTIONS)}{" "}
          at {event_data.time}
        </span>
        <h1>{event_data.name}</h1>
        {event_data.image && (
          <div className={styles.image}>
            <Image
              alt=""
              src={event_data.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event_data.performers}</p>
        <h3>Description</h3>
        <p>{event_data.description}</p>
        <h3>Venue: {event_data.venue}</h3>
        <p>{event_data.address}</p>

        <Link href="/events" className={styles.back}>
          <FaArrowLeft /> Back
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchQuery("events");

  const paths = response.data.map((ev) => {
    return {
      params: { slug: String(ev.attributes.slug) },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetchQuery("events", `${params.slug}`);

  return {
    props: {
      evt: res[0],
    },
    revalidate: 1,
  };
}

// TODO: for later
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }
