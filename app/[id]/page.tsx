// app/[id]/page.tsx
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

interface Item {
  id: number;
  title: string;
  url: string;
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<Item | null>(null);
  const { id } = params;

  useEffect(() => {
    if (id) {
      axios
        .get(`https://jsonplaceholder.typicode.com/photos/${id}`)
        .then((response) => setItem(response.data))
        .catch((error) => console.error("Error fetching item:", error));
    }
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.title}</h1>
      <Image
        src={item.url}
        alt={item.title}
        width={600}
        height={400}
        layout="responsive"
      />
      <p>
        <strong>Description:</strong> {item.title}
      </p>
    </div>
  );
}
