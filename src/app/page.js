import Image from "next/image";
import styles from "./page.module.css";
import { Signin } from "./components/signin/Signin";

export default function Home() {
  return (
    <main className={styles.main}>
      <Signin/>
     
    </main>
  );
}
