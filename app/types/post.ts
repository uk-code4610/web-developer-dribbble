export interface PostCardsType {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  user_id: string;
  created_at?: string;
  profiles: {
    name: string;
  } | null;
}

export interface PostcardProps {
  title: string;
  description: string;
  image_url: string;
  author: string;
  category: string;
  id: string;
}
