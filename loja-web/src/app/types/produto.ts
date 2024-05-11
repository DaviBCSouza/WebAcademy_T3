interface Photo {
  title: string;
  src: string;
}

interface Product {
  id: string;
  photos: Photo[];
  name: string;
  price: string;
  description: string;
  sold: string;
  user_id: string;
}
