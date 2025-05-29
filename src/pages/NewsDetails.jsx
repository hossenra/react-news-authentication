import { Link, useLoaderData } from "react-router";
import Header from "../components/Header";
import RighAside from "../components/homelayout/RighAside";

const NewsDetails = () => {
  const news = useLoaderData();
  console.log(news);
  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="w-11/12 mx-auto grid grid-cols-12 gap-5">
        <section className="col-span-9">
          <h2 className="font-semibold mb-3">Dragon News</h2>
          <div className="card bg-base-100  shadow-xl">
            <figure className="px-10 pt-10">
              <img src={news?.image_url} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{news?.title}</h2>
              <p>{news?.details}</p>
              <div className="card-actions">
                <Link
                  to={`/category/${news?.category_id}`}
                  className="btn btn-primary"
                >
                  All news in this category
                </Link>
              </div>
            </div>
          </div>
        </section>
        <aside className="col-span-3">
          <RighAside />
        </aside>
      </main>
    </div>
  );
};

export default NewsDetails;
