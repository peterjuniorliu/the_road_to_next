"use client";

const Heading = ({title, description}) => 
{
  const myStyling = {
    padding: "16px",
    fontweight: "bold",
  };

  return (
    <div style={myStyling}>
      <h2>{title}</h2>
      <span>{description}</span>
    </div>
  );
};

export default function Page()
{
  const title = "Hello Page";
  const myDescription = "This is a React Primer ...";

  const handleUpvote = () => 
  {
    console.log("Upvoting~");
  }

  return (
    <div>
      <Heading title={title} description={myDescription} />
      <p>Some contents ...</p>
      <button onClick={handleUpvote}>Upvote</button>
    </div>
  );
}