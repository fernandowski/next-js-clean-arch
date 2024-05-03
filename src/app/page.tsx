import Image from "next/image";
import styles from "./page.module.css";
import {redirect} from "next/navigation";

export default function Home() {
    redirect('/dashboard');
  return (
    <p> My first pa ge</p>
  );
}
