const moveToTopButton = document.getElementById("moveToTop");
const searchInput = document.getElementById("search");
const cardSection = document.getElementById("Card_Section");

// Show or hide the "Move to Top" button based on scroll position
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        moveToTopButton.style.display = "block";
    } else {
        moveToTopButton.style.display = "none";
    }
});

// Add event listener for the Enter key to trigger search
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchNews();  // Trigger search when Enter is pressed
    }
});

// Function to handle the search
function searchNews() {
    const query = searchInput.value.trim();
    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    const apiKey = "95f4663a31204ac1a2bacba519d9f8bd";  // Use a valid API key
    const url = `https://newsapi.org/v2/everything?q=${query}&from=${getDate()}&sortBy=publishedAt&apiKey=${apiKey}`;

    cardSection.innerHTML = `<p>Loading...</p>`; // Show loading message

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.articles && data.articles.length > 0) {
                renderCards(data.articles);
            } else {
                cardSection.innerHTML = `<p>No articles found. Try a different search.</p>`;
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            cardSection.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
        });

    // Clear the search input after performing the search
    searchInput.value = "";
}

// Helper function to get the date for the query
function getDate() {
    const date = new Date();
    date.setDate(date.getDate() - 7); // Fetch news from the last 7 days
    return date.toISOString().split("T")[0];
}

// Function to render the fetched news cards
function renderCards(articles) {
    cardSection.innerHTML = ""; // Clear the loading message
    articles.forEach((article) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h3");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        const img = document.createElement("img");
        img.src = article.urlToImage || "https://via.placeholder.com/300x200";
        img.alt = article.title;

        const link = document.createElement("a");
        link.href = article.url;
        link.textContent = "Read more";
        link.target = "_blank";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(link);

        cardSection.appendChild(card);
    });
}

// Scroll to the top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
