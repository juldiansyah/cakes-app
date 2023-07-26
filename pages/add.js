import CakeForm from "../components/Form";
import styles from "../styles/Home.module.css";

function createCakePage() {
  return (
    <div className={styles.container}>
      <div className="w-full">
        <h2 className="text-2xl text-gray-900 mb-5">Create New Cake</h2>
        <CakeForm />
      </div>
    </div>
  );
}

export default createCakePage;
