export const animeFigures = [
  {
    id: 1,
    name: "Goku Ultra Instinct",
    series: "Dragon Ball Z",
    category: "Shonen",
    price: 89.99,
    discountPrice: 74.99,
    inStock: true,
    isOffer: true,
    description: "Figura SH Figuarts de Goku en modo Ultra Instinct completo",
    image: "https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Goku+Ultra+Instinct",
    rating: 4.8,
    features: ["Articulada", "Pintura premium", "Base incluida"],
    scale: "1/7",
    manufacturer: "Bandai",
    stock: 15
  },
  {
    id: 2,
    name: "Monkey D. Luffy Gear 5",
    series: "One Piece",
    category: "Shonen",
    price: 95.50,
    discountPrice: null,
    inStock: true,
    isOffer: false,
    description: "Figura de Luffy en Gear 5 - Edición Limitada",
    image: "https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Luffy+Gear+5",
    rating: 4.9,
    features: ["Edición limitada", "Efectos especiales", "Base temática"],
    scale: "1/6",
    manufacturer: "Megahouse",
    stock: 8
  },
  {
    id: 3,
    name: "Sailor Moon Eternal",
    series: "Sailor Moon",
    category: "Shojo",
    price: 120.00,
    discountPrice: 99.99,
    inStock: true,
    isOffer: true,
    description: "Sailor Moon en su forma Eternal con efectos brillantes",
    image: "https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=Sailor+Moon",
    rating: 4.7,
    features: ["Efecto brillante", "Cristales transparentes", "Base celestial"],
    scale: "1/7",
    manufacturer: "Good Smile Company",
    stock: 12
  },
  {
    id: 4,
    name: "Naruto Sage Mode",
    series: "Naruto Shippuden",
    category: "Shonen",
    price: 78.99,
    discountPrice: 65.50,
    inStock: true,
    isOffer: true,
    description: "Naruto en modo Sabio con detalles de pintura excepcionales",
    image: "https://via.placeholder.com/300x400/96CEB4/FFFFFF?text=Naruto+Sage",
    rating: 4.6,
    features: ["Modo Sabio", "Pintura detallada", "Base de madera"],
    scale: "1/7",
    manufacturer: "Bandai",
    stock: 20
  },
  {
    id: 5,
    name: "Levi Ackerman",
    series: "Attack on Titan",
    category: "Seinen",
    price: 110.00,
    discountPrice: null,
    inStock: true,
    isOffer: false,
    description: "Levi en pose de combate con equipo de maniobras tridimensionales",
    image: "https://via.placeholder.com/300x400/FECA57/FFFFFF?text=Levi+Ackerman",
    rating: 4.9,
    features: ["Equipo 3D", "Pose dinámica", "Base de ruinas"],
    scale: "1/6",
    manufacturer: "Kotobukiya",
    stock: 6
  },
  {
    id: 6,
    name: "Gundam RX-78-2",
    series: "Mobile Suit Gundam",
    category: "Mecha",
    price: 150.00,
    discountPrice: 129.99,
    inStock: true,
    isOffer: true,
    description: "Gundam RX-78-2 modelo perfect grade con armamento completo",
    image: "https://via.placeholder.com/300x400/FF9FF3/FFFFFF?text=Gundam+RX-78",
    rating: 4.8,
    features: ["Modelo PG", "Armamento completo", "LED opcional"],
    scale: "1/60",
    manufacturer: "Bandai",
    stock: 10
  }
];

export const categories = ["Shonen", "Shojo", "Seinen", "Mecha", "Isekai", "Todos"];
export const series = ["Dragon Ball Z", "One Piece", "Naruto Shippuden", "Sailor Moon", "Attack on Titan", "Mobile Suit Gundam", "Todos"];

export const getAllFigures = () => animeFigures;
export const getFigureById = (id) => animeFigures.find(figure => figure.id === parseInt(id));
export const getFiguresByCategory = (category) => {
  if (category === "Todos") return animeFigures;
  return animeFigures.filter(figure => figure.category === category);
};
export const getFiguresOnOffer = () => animeFigures.filter(figure => figure.isOffer);