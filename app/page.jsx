const Heading = ({title, description}) => 
{
  return (
    <div>
      <h2>{title}</h2>
      <span>{description}</span>
    </div>
  );
};

export default function Page()
{
  const title = "Hello Page";
  const myDescription = "This is a React Primer ...";

  return (
    <div>
      <Heading title={title} description={myDescription} />
      <p>Some contents ...</p>
    </div>
  );
}