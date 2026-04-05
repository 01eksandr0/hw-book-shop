/**
 * Каталог: реальні книги з ISBN; обкладинки переважно з Open Library.
 *
 * Важливо: для багатьох ISBN OL віддає мікроскопічну 1×1 заглушку — на сайті це виглядає як «пуста» картинка.
 * Компонент BookCover підміняє такі випадки на запасне фото. Для частини українських позицій нижче задані
 * прямі URL (olid / cover id), де обкладинка в OL точно є.
 */

export type CatalogBook = {
  id: number;
  title: string;
  author: string;
  priceUah: number;
  image: string;
};

export type CatalogBookSeed = {
  title: string;
  author: string;
  /** ISBN-10 або ISBN-13, з дефісами або без */
  isbn: string;
  priceUah: number;
};

export const CATALOG_PER_PAGE = 19;

/** Нормалізує ISBN до цифр для URL Open Library */
export function coverUrlFromIsbn(isbn: string): string {
  const digits = isbn.replace(/\D/g, "");
  return `https://covers.openlibrary.org/b/isbn/${digits}-M.jpg`;
}

const olCoverId = (id: number) => `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
const olEdition = (olid: string) => `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;

/** Де OL має нормальну обкладинку не за нашим ISBN — явний URL. */
function coverImageForSeed(seed: CatalogBookSeed): string {
  const byTitle: Record<string, string> = {
    "Dom Casmurro": olEdition("OL40322367M"),
    "Тіні забутих предків": olCoverId(13012528),
    "Кобзар": olCoverId(6826629),
    "Лісова пісня": olCoverId(13270722),
    Місто: olCoverId(12648742),
    Ворошиловград: olCoverId(12649478),
    "Залишенець. Чорний ворон": olCoverId(12995050),
    "Хіба ревуть воли, як ясла повні?": olCoverId(5434594),
  };
  return byTitle[seed.title] ?? coverUrlFromIsbn(seed.isbn);
}

/**
 * Реальні видання (ISBN для обліку); обкладинка — coverImageForSeed.
 */
export const REAL_CATALOG_BOOKS: CatalogBookSeed[] = [
  { title: "Dom Casmurro", author: "Machado de Assis", isbn: "9780199535643", priceUah: 320 },
  { title: "Тіні забутих предків", author: "Михайло Коцюбинський", isbn: "9789661018612", priceUah: 220 },
  { title: "Кобзар", author: "Тарас Шевченко", isbn: "9789663593897", priceUah: 380 },
  { title: "Захар Беркут", author: "Іван Франко", isbn: "9789661041973", priceUah: 210 },
  { title: "Кайдашева сім'я", author: "Іван Нечуй-Левицький", isbn: "9789660149135", priceUah: 195 },
  { title: "Лісова пісня", author: "Леся Українка", isbn: "9780898758748", priceUah: 240 },
  { title: "Місто", author: "Валер'ян Підмогильний", isbn: "9789661037990", priceUah: 205 },
  { title: "Тигролови", author: "Іван Багряний", isbn: "9789661412005", priceUah: 265 },
  { title: "Собор", author: "Олесь Гончар", isbn: "9789664412585", priceUah: 185 },
  { title: "Ворошиловград", author: "Сергій Жадан", isbn: "9786177262810", priceUah: 290 },
  { title: "Інтермецо", author: "Михайло Коцюбинський", isbn: "9786171250675", priceUah: 175 },
  { title: "Залишенець. Чорний ворон", author: "Василь Шкляр", isbn: "9789661011369", priceUah: 310 },
  { title: "Хіба ревуть воли, як ясла повні?", author: "Панас Мирний", isbn: "9789660364002", priceUah: 200 },
  { title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", priceUah: 260 },
  { title: "Anna Karenina", author: "Leo Tolstoy", isbn: "9780140449262", priceUah: 340 },
  { title: "War and Peace", author: "Leo Tolstoy", isbn: "9780140447937", priceUah: 420 },
  { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", isbn: "9780140449334", priceUah: 360 },
  { title: "The Idiot", author: "Fyodor Dostoevsky", isbn: "9780140448021", priceUah: 315 },
  { title: "Demons", author: "Fyodor Dostoevsky", isbn: "9780140448106", priceUah: 305 },
  { title: "Notes from Underground", author: "Fyodor Dostoevsky", isbn: "9780140449189", priceUah: 225 },
  { title: "The Devils", author: "Fyodor Dostoevsky", isbn: "9780140447958", priceUah: 335 },
  { title: "1984", author: "George Orwell", isbn: "9780451524935", priceUah: 245 },
  { title: "Animal Farm", author: "George Orwell", isbn: "9780156262550", priceUah: 210 },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", priceUah: 255 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084", priceUah: 270 },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "9780316769488", priceUah: 265 },
  { title: "Moby-Dick", author: "Herman Melville", isbn: "9780142437247", priceUah: 295 },
  { title: "The Grapes of Wrath", author: "John Steinbeck", isbn: "9780060935467", priceUah: 280 },
  { title: "Of Mice and Men", author: "John Steinbeck", isbn: "9780140177398", priceUah: 195 },
  { title: "East of Eden", author: "John Steinbeck", isbn: "9780061854994", priceUah: 325 },
  { title: "Beloved", author: "Toni Morrison", isbn: "9780316769174", priceUah: 290 },
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", isbn: "9780060883287", priceUah: 310 },
  { title: "Love in the Time of Cholera", author: "Gabriel García Márquez", isbn: "9780143107597", priceUah: 285 },
  { title: "Dracula", author: "Bram Stoker", isbn: "9780142437568", priceUah: 235 },
  { title: "Tess of the d'Urbervilles", author: "Thomas Hardy", isbn: "9780141439809", priceUah: 250 },
  { title: "Jane Eyre", author: "Charlotte Brontë", isbn: "9780141439724", priceUah: 255 },
  { title: "Wuthering Heights", author: "Emily Brontë", isbn: "9780140447996", priceUah: 240 },
  { title: "Great Expectations", author: "Charles Dickens", isbn: "9780141439600", priceUah: 265 },
  { title: "David Copperfield", author: "Charles Dickens", isbn: "9780141439675", priceUah: 305 },
  { title: "Hard Times", author: "Charles Dickens", isbn: "9780141439563", priceUah: 220 },
  { title: "Resurrection", author: "Leo Tolstoy", isbn: "9780140449158", priceUah: 275 },
  { title: "The Death of Ivan Ilyich", author: "Leo Tolstoy", isbn: "9780140449240", priceUah: 185 },
  { title: "The Kreutzer Sonata", author: "Leo Tolstoy", isbn: "9780140449172", priceUah: 190 },
  { title: "Fathers and Sons", author: "Ivan Turgenev", isbn: "9780140449309", priceUah: 230 },
  { title: "Kafka on the Shore", author: "Haruki Murakami", isbn: "9780375714573", priceUah: 320 },
  { title: "Norwegian Wood", author: "Haruki Murakami", isbn: "9780143107627", priceUah: 295 },
  { title: "Colorless Tsukuru Tazaki", author: "Haruki Murakami", isbn: "9780307389690", priceUah: 305 },
  { title: "The Wind-Up Bird Chronicle", author: "Haruki Murakami", isbn: "9780307476465", priceUah: 340 },
  { title: "Life of Pi", author: "Yann Martel", isbn: "9780375708114", priceUah: 275 },
  { title: "The Road", author: "Cormac McCarthy", isbn: "9780307277677", priceUah: 260 },
  { title: "The Handmaid's Tale", author: "Margaret Atwood", isbn: "9780147514011", priceUah: 285 },
  { title: "Sapiens", author: "Yuval Noah Harari", isbn: "9780062316097", priceUah: 395 },
  { title: "Homo Deus", author: "Yuval Noah Harari", isbn: "9780062316103", priceUah: 385 },
  { title: "21 Lessons for the 21st Century", author: "Yuval Noah Harari", isbn: "9781250307205", priceUah: 375 },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isbn: "9780439708187", priceUah: 340 },
  { title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", isbn: "9780439064873", priceUah: 340 },
  { title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling", isbn: "9780439136365", priceUah: 340 },
  { title: "Harry Potter and the Goblet of Fire", author: "J.K. Rowling", isbn: "9780439358071", priceUah: 360 },
  { title: "Harry Potter and the Order of the Phoenix", author: "J.K. Rowling", isbn: "9780439785969", priceUah: 380 },
  { title: "Harry Potter and the Half-Blood Prince", author: "J.K. Rowling", isbn: "9780439784542", priceUah: 380 },
  { title: "Harry Potter and the Deathly Hallows", author: "J.K. Rowling", isbn: "9780545010221", priceUah: 395 },
  { title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227", priceUah: 310 },
  { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", isbn: "9780547953835", priceUah: 330 },
  { title: "The Two Towers", author: "J.R.R. Tolkien", isbn: "9780547959749", priceUah: 330 },
  { title: "The Return of the King", author: "J.R.R. Tolkien", isbn: "9780547959763", priceUah: 330 },
  { title: "The Alchemist", author: "Paulo Coelho", isbn: "9780062315007", priceUah: 250 },
  { title: "The Little Prince", author: "Antoine de Saint-Exupéry", isbn: "9780156013924", priceUah: 215 },
  { title: "Ender's Game", author: "Orson Scott Card", isbn: "9780345342966", priceUah: 265 },
  { title: "Foundation", author: "Isaac Asimov", isbn: "9780553292411", priceUah: 255 },
  { title: "Dune", author: "Frank Herbert", isbn: "9780441013597", priceUah: 345 },
  { title: "Catch-22", author: "Joseph Heller", isbn: "9780060836229", priceUah: 290 },
  { title: "Slaughterhouse-Five", author: "Kurt Vonnegut", isbn: "9780440180298", priceUah: 245 },
  { title: "The Metamorphosis", author: "Franz Kafka", isbn: "9780805210400", priceUah: 205 },
  { title: "The Trial", author: "Franz Kafka", isbn: "9780805210408", priceUah: 215 },
  { title: "The Stranger", author: "Albert Camus", isbn: "9780679730202", priceUah: 225 },
  { title: "The Three-Body Problem", author: "Liu Cixin", isbn: "9780765382030", priceUah: 350 },
  { title: "The Dark Forest", author: "Liu Cixin", isbn: "9780525569782", priceUah: 355 },
  { title: "Stranger in a Strange Land", author: "Robert A. Heinlein", isbn: "9780553283686", priceUah: 285 },
  { title: "Blindness", author: "José Saramago", isbn: "9780385494376", priceUah: 270 },
  { title: "Lord of the Flies", author: "William Golding", isbn: "9780743477116", priceUah: 230 },
  { title: "Fahrenheit 451", author: "Ray Bradbury", isbn: "9781451673319", priceUah: 235 },
  { title: "The Martian", author: "Andy Weir", isbn: "9780345816023", priceUah: 305 },
  { title: "The Myth of Sisyphus", author: "Albert Camus", isbn: "9780679720201", priceUah: 240 },
  { title: "Oliver Twist", author: "Charles Dickens", isbn: "9780141443437", priceUah: 255 },
  { title: "Stoner", author: "John Williams", isbn: "9780143127745", priceUah: 275 },
  { title: "The Pickwick Papers", author: "Charles Dickens", isbn: "9780141439477", priceUah: 315 },
];

export function buildCatalogBooks(): CatalogBook[] {
  return REAL_CATALOG_BOOKS.map((s, i) => ({
    id: i + 1,
    title: s.title,
    author: s.author,
    priceUah: s.priceUah,
    image: coverImageForSeed(s),
  }));
}

export const ALL_CATALOG_BOOKS = buildCatalogBooks();
