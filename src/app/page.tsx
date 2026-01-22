import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.main}>
        <section className={styles.intro}>
          <h1>Handcrafted Haven</h1>
          <p>
            A marketplace for unique, handcrafted treasures that supports
            local artisans and sustainable shopping.
          </p>
          <div className={styles.ctas}>
            <a className="primary">Browse Products</a>
            <a className="secondary">Become a Seller</a>
          </div>
        </section>
      </div>
    </main>
  );
}
