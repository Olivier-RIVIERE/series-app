const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {currentYear} <strong>Series App</strong> · Projet portfolio
        développé par <a href="https://olivier-riviere-web.vercel.app">Olivier Rivière</a>.
      </p>

      <div className="footer-links">
        <a
          href="https://github.com/Olivier-RIVIERE/series-app"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <span aria-hidden="true">·</span>
        <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">
          Données : TVMaze
        </a>
      </div>
    </footer>
  );
};

export default Footer;