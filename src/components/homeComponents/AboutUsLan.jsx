// import React, { useEffect, useRef, useState } from "react";
// import AboutUsImage from "../../assets/about-us-image.jpeg";
// import styles from "./AboutUsLan.module.css";

// const AboutUsLan = () => {
//   const [aboutUsVisible, setAboutUsVisible] = useState(false);
//   const aboutUsRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setAboutUsVisible(entry.isIntersecting);
//       },
//       { threshold: 0.1 }
//     );

//     if (aboutUsRef.current) {
//       observer.observe(aboutUsRef.current);
//     }

//     return () => {
//       if (aboutUsRef.current) {
//         observer.unobserve(aboutUsRef.current);
//       }
//     };
//   }, []);

//   return (
//     <section
//       id="about-us"
//       ref={aboutUsRef}
//       className={`${styles.aboutUsSection} ${
//         aboutUsVisible ? styles.fadeIn : ""
//       }`}
//     >
//       <h2 className={styles.aboutUsHeading}>About Us</h2>
//       <div className={styles.aboutUsContent}>
//         <div className={styles.aboutUsBox}>
//           <h3 className={styles.aboutUsBoxTitle}>Our Chatbot Solution</h3>
//           <p className={styles.aboutUsBoxDescription}>
//             We develop advanced chatbots using deep learning and natural
//             language processing techniques to accurately understand and respond
//             to queries from employees in large public sector organizations.
//           </p>
//         </div>
//         <div className={styles.aboutUsBox}>
//           <h3 className={styles.aboutUsBoxTitle}>Document Processing</h3>
//           <p className={styles.aboutUsBoxDescription}>
//             Our solution includes powerful document processing capabilities,
//             allowing the chatbot to analyze and extract information from
//             documents uploaded by employees. This includes summarizing documents
//             and extracting relevant text or keyword information.
//           </p>
//         </div>
//         <div className={styles.aboutUsBox}>
//           <h3 className={styles.aboutUsBoxTitle}>Scalability & Security</h3>
//           <p className={styles.aboutUsBoxDescription}>
//             The chatbot architecture is scalable to handle a minimum of 5
//             parallel users, with optimized response times not exceeding 5
//             seconds for any query. Additionally, we provide enhanced security
//             through 2FA and include a bad language filter.
//           </p>
//         </div>
//       </div>
//       <div className={styles.aboutUsImage}>
//         <img src={AboutUsImage} alt="About Us" />
//       </div>
//     </section>
//   );
// };

// export default AboutUsLan;

import React, { useEffect, useRef, useState } from "react";
import AboutUsImage from "../../assets/about-us-image.jpeg";
import styles from "./AboutUsLan.module.css";

const AboutUsLan = () => {
  const [aboutUsVisible, setAboutUsVisible] = useState(false);
  const aboutUsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAboutUsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (aboutUsRef.current) {
      observer.observe(aboutUsRef.current);
    }

    return () => {
      if (aboutUsRef.current) {
        observer.unobserve(aboutUsRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about-us"
      ref={aboutUsRef}
      className={`${styles.aboutUsSection} ${
        aboutUsVisible ? styles.fadeIn : ""
      }`}
    >
      <h2 className={styles.aboutUsHeading}>About Us</h2>
      <div className={styles.aboutUsContent}>
        <div className={styles.aboutUsBox}>
          <div className={styles.aboutUsBoxInner}>
            <h3 className={styles.aboutUsBoxTitle}>Our Chatbot Solution</h3>
            <p className={styles.aboutUsBoxDescription}>
              We develop advanced chatbots using deep learning and natural
              language processing techniques to accurately understand and
              respond to queries from employees in large public sector
              organizations.
            </p>
          </div>
        </div>
        <div className={styles.aboutUsBox}>
          <div className={styles.aboutUsBoxInner}>
            <h3 className={styles.aboutUsBoxTitle}>Document Processing</h3>
            <p className={styles.aboutUsBoxDescription}>
              Our solution includes powerful document processing capabilities,
              allowing the chatbot to analyze and extract information from
              documents uploaded by employees. This includes summarizing
              documents and extracting relevant text or keyword information.
            </p>
          </div>
        </div>
        <div className={styles.aboutUsBox}>
          <div className={styles.aboutUsBoxInner}>
            <h3 className={styles.aboutUsBoxTitle}>Scalability & Security</h3>
            <p className={styles.aboutUsBoxDescription}>
              The chatbot architecture is scalable to handle a minimum of 5
              parallel users, with optimized response times not exceeding 5
              seconds for any query. Additionally, we provide enhanced security
              through 2FA and include a bad language filter.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.aboutUsImage}>
        <img src={AboutUsImage} alt="About Us" />
      </div>
    </section>
  );
};

export default AboutUsLan;
