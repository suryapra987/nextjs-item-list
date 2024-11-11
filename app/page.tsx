// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "../components/SearchBar";

interface Item {
  id: number;
  title: string;
  imageUrl: string;
}

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos?_limit=20"
      );
      const data = response.data.map((item : any) => ({
        id: item.id,
        title: item.title,
        imageUrl: `https://source.unsplash.com/random/300x300?sig=${item.id}`, // Dynamic image URL
      }));
      setItems(data);
      setFilteredItems(data);
    };

    fetchItems().catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Items List</h1>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {filteredItems.map((item) => (
          <Link key={item.id} href={`/${item.id}`} passHref>
            <div
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                cursor: "pointer",
              }}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={150}
                height={150}
                layout="responsive"
              />
              <h3>{item.title}</h3>
              <p>{item.title.slice(0, 50)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
