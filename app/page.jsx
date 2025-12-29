"use client";
import {useState} from "react";
import {Heading} from "./heading";

export default function Page()
{
  const title = "Hello Page";
  const myDescription = "This is a React Primer ...";
  const [upvote, setUpvote] = useState(0);

  const handleUpvote = () => 
  {
    setUpvote(upvote + 1);
  };

  return (
    <div>
      <Heading title={title} description={myDescription}>
        <button onClick={handleUpvote}>Upvote</button>
      </Heading>
      <p>Some contents ...</p>
    </div>
  );
}