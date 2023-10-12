import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Spinner, MasonryLayout } from "./";
import { feedQuery, searchQuery } from "../utils/data";
import { client } from "../utils/client";

function Feed() {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feeds" />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
}

export default Feed;
