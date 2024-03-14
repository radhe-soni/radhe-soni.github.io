import styles from "./page.module.css";
import BasicExample from "./globalComponent/navbar";

export default function Home() {
  return (
    <div className={styles.App}>
        <BasicExample />
        <div>
          <div className={styles.background}>
            <div className={styles.OP}>
              <h1 className={styles.heaading}>Balanced Bite Cafe</h1>
              <button type="button" className="btn btn-primary">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
