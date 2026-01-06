export interface PostCardsType {
  id: string;
  title: string;
  description: string;
  image_url: string;
  user_id: string;
  profiles: {
    name: string;
  } | null;
}

export interface PostcardProps {
  title: string;
  description: string;
  image_url: string;
  author: string;
  id: string;
}
