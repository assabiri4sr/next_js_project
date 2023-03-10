import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Home({ data }) {
  return (
    <div className="text_div">
      <Header />
      {data.map((ev) => (
        <Link key={ev.id} href={`events/${ev.id}`}>
          <img src={ev.image} />
          <div className="text_div">
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </div>
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const data = await import("/data/data.json");
  return {
    props: {
      data: data.events_categories,
    },
  };
}
