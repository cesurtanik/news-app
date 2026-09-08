import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("general");
  const categoryNames = {
  general: "Genel",
  technology: "Teknoloji",
  sports: "Spor",
  business: "Ekonomi",
  health: "Sağlık",
  science: "Bilim",
  entertainment: "Eğlence",
};
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`${API_URL}/api/news?category=${category}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Haberler alınamadı");
        }

        return response.json();
      })
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Haberler yüklenirken bir hata oluştu.");
        setLoading(false);
      });
  }, [category]);

  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <div className="logo">NEWS HUB</div>

        <nav>
  <button
    className={category === "general" ? "active" : ""}
    onClick={() => setCategory("general")}
  >
    Genel
  </button>

  <button
    className={category === "technology" ? "active" : ""}
    onClick={() => setCategory("technology")}
  >
    Teknoloji
  </button>

  <button
    className={category === "sports" ? "active" : ""}
    onClick={() => setCategory("sports")}
  >
    Spor
  </button>

  <button
    className={category === "business" ? "active" : ""}
    onClick={() => setCategory("business")}
  >
    Ekonomi
  </button>

  <button
    className={category === "health" ? "active" : ""}
    onClick={() => setCategory("health")}
  >
    Sağlık
  </button>

  <button
    className={category === "science" ? "active" : ""}
    onClick={() => setCategory("science")}
  >
    Bilim
  </button>

  <button
    className={category === "entertainment" ? "active" : ""}
    onClick={() => setCategory("entertainment")}
  >
    Eğlence
  </button>
</nav>
      </header>

      <main>
        <section className="hero">
          <p className="subtitle">GÜNDEMİ TAKİP ET</p>
          <h1>Son Haberler</h1>
          <p>
            Güncel haberleri kategorilere göre keşfet, ara ve detaylarını
            incele.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Haber ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        <section className="news-section">
          <div className="section-header">
            <p className="section-label">LATEST NEWS</p>
            <h2>Haberler</h2>
          </div>

          {loading && <p className="message">Haberler yükleniyor...</p>}

          {error && <p className="message error">{error}</p>}

          {!loading && !error && filteredArticles.length === 0 && (
            <p className="message">Aradığın haber bulunamadı.</p>
          )}

          {selectedArticle ? (
  <div className="article-detail">
    <button
      type="button"
      className="back-button"
      onClick={() => setSelectedArticle(null)}
    >
      ← Haberlere Dön
    </button>

    {selectedArticle.urlToImage && (
      <img
        src={selectedArticle.urlToImage}
        alt={selectedArticle.title}
      />
    )}

    <div className="article-detail-content">
      <span>
        {selectedArticle.source?.name || "Haber Kaynağı"}
      </span>

      <h2>{selectedArticle.title}</h2>

      <p>
        {selectedArticle.description ||
          "Bu haber için açıklama bulunmuyor."}
      </p>

      <a
        href={selectedArticle.url}
        target="_blank"
        rel="noreferrer"
      >
        Orijinal Habere Git →
      </a>
    </div>
  </div>
) : (
  <div className="news-grid">
    {filteredArticles.map((article, index) => (
      <article
        className="news-card"
        key={article.url || index}
      >
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
          />
        )}

        <div className="news-content">
          <span>
            {article.source?.name || "Haber Kaynağı"}
          </span>

          <h3>{article.title}</h3>

          <p>
            {article.description ||
              "Bu haber için açıklama bulunmuyor."}
          </p>

          <button
            type="button"
            className="read-button"
            onClick={() => setSelectedArticle(article)}
          >
            Haberi İncele →
          </button>
        </div>
      </article>
    ))}
  </div>
)}
        </section>
      </main>
    </div>
  );
}

export default App;