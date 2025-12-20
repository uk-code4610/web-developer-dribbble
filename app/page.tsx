const posts = [
  {
    id: "1",
    title: "Mountain Climbing UI",
    description: "A UI design for climbers.",
    imageUrl: "/afro_logo.svg",
    author: "Alice",
  },
  {
    id: "2",
    title: "Travel Planner App",
    description: "Organize trips efficiently.",
    imageUrl: "/vercel.svg",
    author: "Bob",
  },
  {
    id: "3",
    title: "Recipe Sharing Platform",
    description: "Share your favorite recipes.",
    imageUrl: "/vercel.svg",
    author: "Charlie",
  },
];

import PostCard from "../components/PostCard";

const Page = () => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          description={post.description}
          imageUrl={post.imageUrl}
          author={post.author}
        />
      ))}
    </div>
  );
};

export default Page;
