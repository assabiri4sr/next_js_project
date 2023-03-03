import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const Page = ({ data }) => {
  return (
    <div className="text_div">
      <Header />
      <img src={data.image} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <Footer />
    </div>
  );
};

export default Page;

export async function getStaticPaths() {
  const data = await import("/data/data.json");
  const allEvents = data.allEvents;

  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await import("/data/data.json");
  const id = context.params.id;
  const allEvents = data.allEvents;
  const eventData = allEvents.find((ev) => id === ev.id);

  return {
    props: { data: eventData },
  };
}
