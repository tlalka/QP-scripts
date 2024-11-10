extraReps = ['gay', 'trans', 'lesbian', 'bisexual', 'non-binary', 'Black', 'latino'];

const books = [
    {
        title: 'Bleeding Mars',
        genre: ['Sci-Fi'],
        author: 'Asher J. Quazar',
        url: 'https://www.amazon.com/Bleeding-Mars-Vampire-Dystopian-Sci-Fi-ebook/dp/B0D5GRJXGM',
        charity: 'The Trevor Project',
        charity_url: 'https://www.thetrevorproject.org/',
        e_price: 5.99,
        p_price: 16.99,
        discount: 100,
        image: '/src/imgs/bap-covers/1.jpg',
        description: 'A gripping tale of queer space vampires and intrigue.',
        rep: ['trans author', 'trans MC', 'gay author', 'gay MC']
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
        discount: 50,
        image: 'https://via.placeholder.com/200x300?text=Galactic+Heist',
        description: 'Join the heist of the millennium across galaxies.',
        rep: ['non-binary side character', 'disabled character']
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
        discount: 10,
        image: 'https://via.placeholder.com/200x300?text=Enchanted+Grove',
        description: 'A magical adventure through the world of fae.',
        rep: ['sapphic author', 'lesbian MC']
    },
    {
        title: 'Heartstrings',
        genre: ['Romance'],
        author: 'Your Mom',
        url: 'https://www.amazon.com/Bleeding-Mars-Vampire-Dystopian-Sci-Fi-ebook/dp/B0D5GRJXGM',
        charity: 'The Trevor Project',
        charity_url: 'https://www.thetrevorproject.org/',
        e_price: 5.99,
        p_price: 16.99,
        discount: 25,
        image: 'https://via.placeholder.com/200x300?text=Heartstrings',
        description: 'A heartwarming romance story that will melt your heart.',
        rep: ['bisexual MC', 'aro author']
    },
    {
        title: 'Mystic Shadows',
        genre: ['Thriller'],
        author: 'Mary Sue',
        url: 'https://www.amazon.com/Bleeding-Mars-Vampire-Dystopian-Sci-Fi-ebook/dp/B0D5GRJXGM',
        charity: 'The Trevor Project',
        charity_url: 'https://www.thetrevorproject.org/',
        e_price: 5.99,
        p_price: 16.99,
        discount: 100,
        image: 'https://via.placeholder.com/200x300?text=Mystic+Shadows',
        description: 'A thriller that will keep you on the edge of your seat.',
        rep: ['Black author', 'gay side character']
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
        if (book.discount === 100) {
            sticker = "a-sticker";
        } else if (book.discount >= 50) {
            sticker = "b-sticker";
        }

        const bookCard = document.createElement('a');
        bookCard.classList.add('book-card');

        // Convert the genre and rep arrays to comma-separated strings
        const genreList = book.genre.join(', ');
        const repList = book.rep ? book.rep.join(', ') : 'No representation listed';

        bookCard.href = book.url;
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
                        <p class="${sticker} center">${book.discount}%</p>   
                    </div>
                </div>
                <div class="pair">
                    <p>Charity:</p>
                    <a class="center" href="${book.charity_url}">${book.charity}</a>
                </div>
                <div class="pair">
                    <p>Ebook:</p>
                    <span class="center">$${book.e_price.toFixed(2)}</span>
                    <p>Print:</p>
                    <span class="center">$${book.p_price.toFixed(2)}</span>
                </div>
            </div>
        `;
        bookList.appendChild(bookCard);
    });
}


function filterBooks() {
    const searchValue = searchTitle.value.trim();
    const genreValue = searchGenre.value.toLowerCase();
    const discountValue = parseInt(priceRange.value); // Assume priceRange is now a range for discount

    // Check if searchValue contains quoted text (e.g., "exact phrase")
    const exactMatchRegex = /"([^"]+)"/;
    const exactMatch = searchValue.match(exactMatchRegex);

    let searchWords = [];
    let searchExact = '';

    if (exactMatch) {
        // If a quoted text is found, set it as exact match and remove it from the search value
        searchExact = exactMatch[1].toLowerCase();
        searchWords = searchValue.replace(exactMatchRegex, '').trim().split(' ').filter(word => word.length > 0);
    } else {
        // If no quoted text is found, treat the whole search value as individual words
        searchWords = searchValue.split(' ').filter(word => word.length > 0);
    }

    const filteredBooks = books.filter(book => {
        // First check for exact match if searchExact is set
        const matchesExact = searchExact ? (
            book.title.toLowerCase().includes(searchExact) ||
            book.author.toLowerCase().includes(searchExact) ||
            book.description.toLowerCase().includes(searchExact) ||
            (book.rep && book.rep.join(', ').toLowerCase().includes(searchExact)) ||
            book.genre.join(', ').toLowerCase().includes(searchExact)
        ) : true;

        // Then check for the regular word search
        const matchesText = searchWords.every(word => {
            return (
                book.title.toLowerCase().includes(word) ||
                book.author.toLowerCase().includes(word) ||
                book.description.toLowerCase().includes(word) ||
                (book.rep && book.rep.join(', ').toLowerCase().includes(word)) ||
                book.genre.join(', ').toLowerCase().includes(word)
            );
        });

        // Check if the selected genre matches any of the genres in the book's array
        const matchesGenre = genreValue === '' || book.genre.some(g => g.toLowerCase() === genreValue);

        // Check if the book's discount is within the specified range
        const matchesDiscount = book.discount >= discountValue;

        // Return true if both exact match and word match criteria are satisfied
        return matchesExact && matchesText && matchesGenre && matchesDiscount;
    });

    displayBooks(filteredBooks);
}


// Event Listeners for Filters
searchTitle.addEventListener('input', filterBooks);
searchGenre.addEventListener('change', filterBooks);
document.getElementById('search-rep').addEventListener('change', filterBooks); // Added event listener for rep filter
priceRange.addEventListener('input', () => {
    priceValue.textContent = `${priceRange.value}%`;
    filterBooks();
});

// Helper function to generate all possible subsets of a given array
function generateCombinations(arr) {
    const result = [];

    arr.forEach(phrase => {
        // Split the phrase into words
        const words = phrase.split(' ');

        // Add all single word combinations to the result
        words.forEach(word => {
            result.push(word);
        });

        // Add all two-word combinations to the result
        for (let i = 0; i < words.length - 1; i++) {
            for (let j = i + 1; j < words.length; j++) {
                result.push(words.slice(i, j + 1).join(' '));
            }
        }
    });

    return result;
}

// Function to populate filter options dynamically
function populateFilters() {
    const genreSelect = document.getElementById('search-genre');
    const repSelect = document.getElementById('search-rep');

    // Get unique genres from the books array
    const genres = [...new Set(books.flatMap(book => book.genre))];

    // Populate genre filter
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });

    // Get unique representations from the books array
    const reps = [...extraReps.sort(), ...[...new Set(books.flatMap(book => book.rep))].sort()];

    // Populate rep filter
    (reps).forEach(rep => {
        const option = document.createElement('option');
        option.value = rep;
        option.textContent = rep;
        repSelect.appendChild(option);
    });
}

// Call the populateFilters function to dynamically populate options
populateFilters();


// Initial Display
displayBooks(books);
