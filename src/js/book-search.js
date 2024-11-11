extraReps = ['gay', 'trans', 'sapphic', 'bisexual', 'non-binary', 'Black', 'Latine', 'Asian', 'Indigenous', 'aro/ace', 'disabled'];

const books = [
    {
        title: 'Bleeding Mars',
        genre: ['Sci-Fi', 'LGBT'],
        author: 'Asher J. Quazar',
        url: 'https://www.amazon.com/Bleeding-Mars-Vampire-Dystopian-Sci-Fi-ebook/dp/B0D5GRJXGM',
        charity: 'The Trevor Project',
        charity_url: 'https://www.thetrevorproject.org/',
        e_price: 5.99,
        p_price: 16.99,
        donation: 100,
        image: './src/imgs/bap-covers/1.jpg',
        description: 'When a young man on the run from a criminal bounty flees to the neon-soaked streets of Chryse City, he becomes entangled with an immortal who keeps more secrets than friends.',
        rep: ['trans author', 'trans MC', 'gay author', 'gay MC', 'non-binary character', 'Latine MC']
    },
    {
        title: 'Galactic Heist',
        genre: ['Sci-Fi'],
        author: 'Bob Joe',
        url: 'https://www.amazon.com/Bleeding-Mars-Vampire-Dystopian-Sci-Fi-ebook/dp/B0D5GRJXGM',
        charity: 'The Trevor Project',
        charity_url: 'https://www.thetrevorproject.org/',
        e_price: 5.99,
        p_price: 16.99,
        donation: 50,
        image: 'https://via.placeholder.com/200x300?text=Galactic+Heist',
        description: 'Join the heist of the millennium across galaxies.',
        rep: ['non-binary character', 'disabled character']
    },
    {
        title: 'The Enchanted Grove',
        genre: ['Fantasy'],
        author: 'My Dog',
        url: 'https://www.amazon.com/Bleeding-Mars-Vampire-Dystopian-Sci-Fi-ebook/dp/B0D5GRJXGM',
        charity: 'The Trevor Project',
        charity_url: 'https://www.thetrevorproject.org/',
        e_price: 5.99,
        p_price: 16.99,
        donation: 10,
        image: 'https://via.placeholder.com/200x300?text=Enchanted+Grove',
        description: 'A magical adventure through the world of fae.',
        rep: ['sapphic author', 'sapphic MC', 'Asian character']
    },
    {
        title: 'Heartstrings',
        genre: ['Romance', 'Erotica'],
        author: 'Your Mom',
        url: 'https://www.amazon.com/Bleeding-Mars-Vampire-Dystopian-Sci-Fi-ebook/dp/B0D5GRJXGM',
        charity: 'The Trevor Project',
        charity_url: 'https://www.thetrevorproject.org/',
        e_price: 5.99,
        p_price: 16.99,
        donation: 25,
        image: 'https://via.placeholder.com/200x300?text=Heartstrings',
        description: 'A heartwarming romance story that will melt your heart.',
        rep: ['bisexual MC', 'aro/ace author', 'Indigenous MC']
    },
    {
        title: 'Mystic Shadows',
        genre: ['Thriller', 'Horror'],
        author: 'Mary Sue',
        url: 'https://www.amazon.com/Bleeding-Mars-Vampire-Dystopian-Sci-Fi-ebook/dp/B0D5GRJXGM',
        charity: 'The Trevor Project',
        charity_url: 'https://www.thetrevorproject.org/',
        e_price: 5.99,
        p_price: -1,
        donation: 100,
        image: 'https://via.placeholder.com/200x300?text=Mystic+Shadows',
        description: 'A thriller that will keep you on the edge of your seat.',
        rep: ['Black author', 'gay character', 'autistic MC']
    }
];

const bookList = document.getElementById('book-list');
const searchTitle = document.getElementById('search-title');
const searchGenre = document.getElementById('search-genre');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');

function displayBooks(filteredBooks) {
    bookList.innerHTML = '';
    filteredBooks.forEach(book => {
        let sticker = "c-sticker";
        if (book.donation === 100) {
            sticker = "a-sticker";
        } else if (book.donation >= 50) {
            sticker = "b-sticker";
        }

        const bookCard = document.createElement('a');
        bookCard.classList.add('book-card');

        const genreList = book.genre.join(', ');
        const repList = book.rep ? book.rep.join(', ') : 'No representation listed';

        bookCard.href = book.url;
        bookCard.target = "_blank";
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}" style="flex:1">
            <div class='book-deets'>
                <h2>${book.title}</h2>
                <h3>${genreList}</h3>
                <p>${book.author}</p>
                <hr class="dark" />
                <p>${book.description}</p>
                <hr class="dark" />
                <b>${repList}</b>
                <div class="pair">
                    <div>
                        <p class="center" style="margin: 30px 0">Author pledge amount:</p>
                    </div>
                    <div>
                        <p class="${sticker} center">${book.donation}%</p>   
                    </div>
                </div>
                <div class="pair">
                    <p>Charity:</p>
                    <a target="_blank" class="center" href="${book.charity_url}">${book.charity}</a>
                </div>
                <div class="pair">
                    <p>Ebook:</p>
                    <span class="center">$${book.e_price.toFixed(2)}</span>
            ${book.p_price >= 0 ? `
            <p>Print:</p>
            <span class="center">$${book.p_price.toFixed(2)}</span>` : ''}
        </div>
    </div>
`;
        bookList.appendChild(bookCard);
    });
}


function filterBooks() {
    const searchValue = searchTitle.value.trim();
    const genreValue = searchGenre.value.toLowerCase();
    const donationValue = parseInt(priceRange.value);

    const exactMatchRegex = /"([^"]+)"/;
    const exactMatch = searchValue.match(exactMatchRegex);

    let searchWords = [];
    let searchExact = '';

    if (exactMatch) {
        searchExact = exactMatch[1].toLowerCase();
        searchWords = searchValue.replace(exactMatchRegex, '').trim().split(' ').filter(word => word.length > 0);
    } else {
        searchWords = searchValue.split(' ').filter(word => word.length > 0);
    }

    const filteredBooks = books.filter(book => {
        const matchesExact = searchExact ? (
            book.title.toLowerCase().includes(searchExact) ||
            book.author.toLowerCase().includes(searchExact) ||
            book.description.toLowerCase().includes(searchExact) ||
            (book.rep && book.rep.join(', ').toLowerCase().includes(searchExact)) ||
            book.genre.join(', ').toLowerCase().includes(searchExact)
        ) : true;
        const matchesText = searchWords.every(word => {
            return (
                book.title.toLowerCase().includes(word) ||
                book.author.toLowerCase().includes(word) ||
                book.description.toLowerCase().includes(word) ||
                (book.rep && book.rep.join(', ').toLowerCase().includes(word)) ||
                book.genre.join(', ').toLowerCase().includes(word)
            );
        });

        const matchesGenre = genreValue === '' || book.genre.some(g => g.toLowerCase() === genreValue);
        const matchesdonation = book.donation >= donationValue;
        return matchesExact && matchesText && matchesGenre && matchesdonation;
    });

    displayBooks(filteredBooks);
}

searchTitle.addEventListener('input', filterBooks);
searchGenre.addEventListener('change', filterBooks);
document.getElementById('search-rep').addEventListener('change', filterBooks);
priceRange.addEventListener('input', () => {
    priceValue.textContent = `${priceRange.value}%`;
    filterBooks();
});

function generateCombinations(arr) {
    const result = [];

    arr.forEach(phrase => {
        const words = phrase.split(' ');
        words.forEach(word => {
            result.push(word);
        });

        for (let i = 0; i < words.length - 1; i++) {
            for (let j = i + 1; j < words.length; j++) {
                result.push(words.slice(i, j + 1).join(' '));
            }
        }
    });

    return result;
}

function populateFilters() {
    const genreSelect = document.getElementById('search-genre');
    const repSelect = document.getElementById('search-rep');
    const genres = [...new Set(books.flatMap(book => book.genre))];

    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });

    const reps = [...extraReps.sort(), ...[...new Set(books.flatMap(book => book.rep))].sort()];

    (reps).forEach(rep => {
        const option = document.createElement('option');
        option.value = rep;
        option.textContent = rep;
        repSelect.appendChild(option);
    });
}

populateFilters();
displayBooks(books);
