export interface MenuItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  videoUrl?: string;
  ingredients?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface BlogPost {
  id?: string;
  type: 'featured' | 'grid';
  badge?: string;
  title: string;
  description?: string;
  author?: string;
  category: string;
  category_color: string;
  media_url: string;
  display_order: number;
}
