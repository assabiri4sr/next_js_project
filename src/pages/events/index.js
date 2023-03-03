import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const EventsPage = ({ data }) => {
  return (
    <div className="text_div">
      <Header />
      <h1>Events Page</h1>
      {data.map((ev) => (
        <Link key={ev.id} alt={ev.title} href={`/events/${ev.id}`}>
          <img className="events_img" src={ev.image} />
          <div className="text_div">
            <h2>{ev.title}</h2>
          </div>
        </Link>
      ))}
      <Footer />
    </div>
  );
};

export default EventsPage;

export async function getServerSideProps() {
  const { events_categories } = await import("/data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
