import * as React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Markdown from "./markdown";

const Article = ({ article }) => {
  return (
    <div className="m-4 flex flex-col md:flex-row">
      <img
        src={article.image}
        alt={article.title}
        className="h-full w-1/2 m-4 aspect-auto"
      />
      <div className="m-4">
        <h3 className="text-xl font-extrabold uppercase tracking-wider mb-4">
          {article.title}
        </h3>
        <Markdown content={article.content}></Markdown>
      </div>
    </div>
  );
};

const Blog = ({ articles }) => {
  return articles.map((article) => (
    <Article key={article.title} article={article}></Article>
  ));
};
const Map = ({ geojson, initZoom, popupContent, token }) => {
  const geojsonObject = JSON.parse(geojson);
  const coordinates = [
    geojsonObject.coordinates[1],
    geojsonObject.coordinates[0],
  ];
  return (
    <MapContainer
      className="h-72"
      zoom={initZoom}
      maxZoom={19}
      scrollWheelZoom={false}
      center={coordinates}
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        id="mapbox/streets-v12"
        accessToken={token}
      />
      <Marker position={coordinates}>
        <Popup>{popupContent}</Popup>
      </Marker>
    </MapContainer>
  );
};

const SectionContent = ({ title, content }) => {
  return (
    <>
      <h3 className="text-2xl font-extrabold uppercase tracking-wider mb-4">
        {title}
      </h3>
      <Markdown content={content}></Markdown>
    </>
  );
};

const Gallery = ({ gallery }) => {
  return (
    <div className="flex items-center flex-wrap justify-evenly">
      {gallery.map((item) => (
        <img
          key={item.url}
          src={item.url}
          alt={item.title}
          className="w-full md:w-5/12 m-4 rounded-lg"
        />
      ))}
    </div>
  );
};

const Section = ({
  anchor,
  title,
  content,
  leftImage,
  bottomImage,
  gallery,
  articles,
  map,
}) => {
  let contentElement = (
    <SectionContent title={title} content={content}></SectionContent>
  );
  let additionalClasses = [];
  if (leftImage) {
    additionalClasses = " flex items-center flex-col md:flex-row";
    contentElement = (
      <>
        <img src={leftImage} alt="" className="h-full w-1/2 m-4 aspect-auto" />
        <div className="m-4">{contentElement}</div>
      </>
    );
  }
  return (
    <>
      <section
        className={"container mx-auto max-w-5xl p-12" + additionalClasses}
        id={anchor}
      >
        {contentElement}
        {gallery && <Gallery gallery={gallery}></Gallery>}
        {articles && <Blog articles={articles}></Blog>}
        {map && <Map {...map}></Map>}
      </section>
      {bottomImage && (
        <section
          className="h-[50vh] bg-cover bg-fixed bg-center"
          style={{ backgroundImage: `url(${bottomImage})` }}
        ></section>
      )}
    </>
  );
};

export default Section;
