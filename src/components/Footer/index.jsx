import React from "react";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const github = <FontAwesomeIcon icon={faGithub} />;

  return (
    <>
      <div className={styles.footer_div}>
        <div className="footer-info">
          <h4>All rights reserved 2021</h4>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/OmarDarioMelendrez/ecommerce-zapatillas"
            target="_blank"
            rel="noreferrer"
          >
            {github}
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
