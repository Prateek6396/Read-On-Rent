// src/seeders/booksData.js
// Generates the 66-book demo catalog referenced in the project docs,
// spread across the 8 standard categories. Titles/authors are well-known
// public metadata used only as placeholder demo content - swap in your
// real catalog (e.g. exported from mockData.js) before going to production.

const catalog = {
  Fiction: [
    ['The Alchemist', 'Paulo Coelho'],
    ['To Kill a Mockingbird', 'Harper Lee'],
    ['1984', 'George Orwell'],
    ['The Great Gatsby', 'F. Scott Fitzgerald'],
    ['The Kite Runner', 'Khaled Hosseini'],
    ['Life of Pi', 'Yann Martel'],
    ['The Book Thief', 'Markus Zusak'],
    ['Norwegian Wood', 'Haruki Murakami'],
  ],
  Romance: [
    ['Pride and Prejudice', 'Jane Austen'],
    ['Me Before You', 'Jojo Moyes'],
    ['The Notebook', 'Nicholas Sparks'],
    ['Outlander', 'Diana Gabaldon'],
    ['It Ends With Us', 'Colleen Hoover'],
    ['The Fault in Our Stars', 'John Green'],
    ['Beach Read', 'Emily Henry'],
    ['Twilight', 'Stephenie Meyer'],
  ],
  Mystery: [
    ['Gone Girl', 'Gillian Flynn'],
    ['The Girl with the Dragon Tattoo', 'Stieg Larsson'],
    ['And Then There Were None', 'Agatha Christie'],
    ['The Da Vinci Code', 'Dan Brown'],
    ['Big Little Lies', 'Liane Moriarty'],
    ['Sherlock Holmes: A Study in Scarlet', 'Arthur Conan Doyle'],
    ['The Silent Patient', 'Alex Michaelides'],
    ['In the Woods', 'Tana French'],
  ],
  Business: [
    ['Atomic Habits', 'James Clear'],
    ['Rich Dad Poor Dad', 'Robert Kiyosaki'],
    ['Zero to One', 'Peter Thiel'],
    ['The Lean Startup', 'Eric Ries'],
    ['Good to Great', 'Jim Collins'],
    ['Thinking, Fast and Slow', 'Daniel Kahneman'],
    ['The Innovators Dilemma', 'Clayton Christensen'],
    ['Start with Why', 'Simon Sinek'],
  ],
  'Sci-Fi': [
    ['Dune', 'Frank Herbert'],
    ["Ender's Game", 'Orson Scott Card'],
    ['The Martian', 'Andy Weir'],
    ['Neuromancer', 'William Gibson'],
    ['Foundation', 'Isaac Asimov'],
    ['Brave New World', 'Aldous Huxley'],
    ['The Hitchhikers Guide to the Galaxy', 'Douglas Adams'],
    ['Project Hail Mary', 'Andy Weir'],
  ],
  Fantasy: [
    ['Harry Potter and the Sorcerers Stone', 'J.K. Rowling'],
    ['The Hobbit', 'J.R.R. Tolkien'],
    ['A Game of Thrones', 'George R.R. Martin'],
    ['The Name of the Wind', 'Patrick Rothfuss'],
    ['Mistborn', 'Brandon Sanderson'],
    ['The Way of Kings', 'Brandon Sanderson'],
    ['Eragon', 'Christopher Paolini'],
    ['Percy Jackson and the Olympians', 'Rick Riordan'],
  ],
  'Self-Help': [
    ['The Power of Now', 'Eckhart Tolle'],
    ['7 Habits of Highly Effective People', 'Stephen Covey'],
    ['Man\'s Search for Meaning', 'Viktor Frankl'],
    ['The Subtle Art of Not Giving a F*ck', 'Mark Manson'],
    ['101 Essays That Will Change the Way You Think', 'Brianna Wiest'],
    ['Daring Greatly', 'Brene Brown'],
    ['You Are a Badass', 'Jen Sincero'],
    ['The 5 AM Club', 'Robin Sharma'],
  ],
  'Non-Fiction': [
    ['Sapiens', 'Yuval Noah Harari'],
    ['Educated', 'Tara Westover'],
    ['Becoming', 'Michelle Obama'],
    ['A Brief History of Time', 'Stephen Hawking'],
    ['The Diary of a Young Girl', 'Anne Frank'],
    ['Into the Wild', 'Jon Krakauer'],
    ['Outliers', 'Malcolm Gladwell'],
    ['When Breath Becomes Air', 'Paul Kalanithi'],
    ['The Immortal Life of Henrietta Lacks', 'Rebecca Skloot'],
    ['Born a Crime', 'Trevor Noah'],
  ],
};

const books = [];
let counter = 1;

for (const [category, titles] of Object.entries(catalog)) {
  for (const [title, author] of titles) {
    const price7 = 30 + ((counter * 7) % 40); // deterministic pseudo-random pricing
    const price14 = Math.round(price7 * 1.7);
    const price30 = Math.round(price7 * 3);
    const deposit = 100 + ((counter * 13) % 100);

    books.push({
      title,
      author,
      isbn: `ROR-${String(counter).padStart(4, '0')}`,
      category,
      rentalPrice7Days: price7,
      rentalPrice14Days: price14,
      rentalPrice30Days: price30,
      securityDeposit: deposit,
      description: `${title} by ${author} - a must-read ${category.toLowerCase()} title, available for rent on Read on Rent.`,
      coverImage: `https://picsum.photos/seed/ror-book-${counter}/400/600`,
      pages: 150 + ((counter * 17) % 400),
      publisher: 'Read on Rent Publishing Partners',
      publicationYear: 1990 + ((counter * 3) % 34),
      rating: Math.round((3.5 + ((counter * 7) % 15) / 10) * 10) / 10,
      numReviews: 50 + ((counter * 37) % 1500),
      totalCopies: 10,
      availableCopies: 10,
      isActive: true,
    });
    counter += 1;
  }
}

module.exports = books; // 66 books across 8 categories
