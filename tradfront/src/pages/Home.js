// src/pages/Home.js
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="container">
      <h2>Bienvenue chez Translation Services</h2>
      <p>Découvrez nos services et demandez des traductions de manière transparente.</p>
      <div>
        <a href="/translation" className="button">Demander une traduction sécurisée</a>
      </div>
      <div>
        <h3>À propos de nous</h3>
        <p>
          Translation Services s'engage à fournir des services de traduction de haute qualité
          dans différents domaines, y compris la légalisation et la relecture. Nos traducteurs
          expérimentés garantissent la précision et la confidentialité de chaque traduction.
        </p>
      </div>
      <div>
        <h3>Pourquoi choisir Translation Services ?</h3>
        <ul>
          <li>Traductions de qualité par des professionnels</li>
          <li>Processus transparent et sécurisé</li>
          <li>Services complémentaires tels que la légalisation et la relecture</li>
          <li>Expérience utilisateur exceptionnelle</li>
        </ul>
      </div>
      <div>
        <h3>Contactez-nous</h3>
        <p>
          Si vous avez des questions ou avez besoin d'assistance, n'hésitez pas à nous contacter
          à l'adresse email : <a href="mailto:info@translationservices.com">info@translationservices.com</a>.
        </p>
      </div>
    </div>
  );
}

export default Home;
