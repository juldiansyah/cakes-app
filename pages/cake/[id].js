import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import CakeForm from "@/components/Form";
import Loader from "@/components/Loader";
import styles from "@/styles/Home.module.css";
import { setSelectedCake } from "@/store/cakeSlice";
import { getCakeDetail } from "@/provider/cakes";

function updateCakePage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const { selectedCake } = useSelector((state) => state.cakes);

  useEffect(() => {
    const refetchCakeDetail = async () => {
      if (router.isReady) {
        const response = await getCakeDetail(router.query.id);
        if (response.status == "SUCCESS") {
          setShowForm(true);
          dispatch(setSelectedCake(response.data));
        } else alert(response.message);
      }
    };

    if (!selectedCake.id) {
      refetchCakeDetail();
    } else setShowForm(true);
  }, [router.isReady]);

  return (
    <div className={styles.container}>
      <div className="w-full">
        <h2 className="text-2xl text-gray-900 mb-5">Update Cake</h2>
        {showForm ? <CakeForm /> : <Loader />}
      </div>
    </div>
  );
}

export default updateCakePage;
