import React from "react";

// Fonction pour le changement d'année
const formatDate = (date) => date.getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {formatDate(new Date())} Series App. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;