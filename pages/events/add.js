import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { baseUrl } from "utils";
import styles from "@/styles/Form.module.css";
import { FaArrowLeft } from "react-icons/fa";

export default function AddEventPage() {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields.");
    }

    const response = await fetch(`${baseUrl}/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: values }),
    });

    if (!response.ok) {
      toast.error("Something went wrong! Please try again later.");
    } else {
      const evt = await response.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setValues((evt) => ({ ...evt, [name]: value }));
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <FaArrowLeft /> Back
      </Link>
      <h1>Add Event</h1>
      <ToastContainer
        theme="colored"
        autoClose={2000}
        hideProgressBar={true}
        pauseOnHover
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {/* Event name */}
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          {/* Performers */}
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              id="performers"
              type="text"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          {/* Venue */}
          <div>
            <label htmlFor="name">Venue</label>
            <input
              id="venue"
              type="text"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          {/* Address */}
          <div>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          {/* Date */}
          <div>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          {/* Time */}
          <div>
            <label htmlFor="time">Time</label>
            <input
              id="time"
              type="text"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}
