import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

const DATE_OPTIONS = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          alt=""
          src={
            evt.image
              ? evt.image.data.attributes.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString("en-GB", DATE_OPTIONS)} at{" "}
          {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
}
