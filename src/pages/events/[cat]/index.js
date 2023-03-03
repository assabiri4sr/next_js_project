import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const Page = ({ data, pageName }) => {
  return (
    <div className="text_div">
      <Header />
      <h1>{pageName}</h1>

      {data.map((ev) => (
        <Link key={ev.id} alt={ev.title} href={`/events/${ev.city}/${ev.id}`}>
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
};

export default Page;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });
  console.log(allPaths);
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.cat;
  const { allEvents } = await import("/data/data.json");

  const data = allEvents.filter((ev) => ev.city === id);

  return { props: { data, pageName: id } };
}
