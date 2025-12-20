interface PostcardProps {
  title: string;
  description: string;
  imageUrl: string;
  author: string;
}

const PostCard = ({ title, description, imageUrl, author }: PostcardProps) => {
  return (
    <div className="border rounded-lg shadow-md p-4 max-w-sm w-full mx-auto">
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} className="w-48 h-48 object-cover" />
      <p>{description}</p>
      <p>by {author}</p>
    </div>
  );
};

export default PostCard;
