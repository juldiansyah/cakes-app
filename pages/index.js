import { useState } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Modal from "../components/Modal";
import { wrapper } from "@/store/store";
import { addCakeList, setSelectedCake } from "@/store/cakeSlice";

import { getCakeLists, deleteCake } from "@/provider/cakes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Loader from "@/components/Loader";

const TABLE_HEAD = ["Image", "Title", "Description", "Rating", ""];

function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [cakeId, setCakeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { cakes: cakeData } = useAppSelector((state) => state.cakes);

  const onHandlePagination = async (type) => {
    let _page = page;
    setIsLoading(true);
    if (type == "prev" && page > 0) {
      _page = page - 1;
    }
    if (type == "next" && page < cakeData.total_page) {
      _page = page + 1;
    }

    const response = await getCakeLists(_page);
    dispatch(addCakeList(response.data));
    setPage(_page);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cakes App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        {cakeId && (
          <Modal
            title="delete"
            onCancel={() => {
              setCakeId("");
            }}
            cancelText="Cancel"
            onProceed={async () => {
              const response = await deleteCake(cakeId);
              setCakeId("");
              fetchCake();
            }}
            proceedText="Save"
          >
            Are you sure?
          </Modal>
        )}
        <div className="mb-5 flex justify-between items-center">
          <h1 className="text-2xl text-gray-900">Cake List</h1>
          <Link
            href={"/add"}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add New
          </Link>
        </div>
        <div className="relative flex flex-col text-gray-700 shadow-md w-full h-full">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <span className="font-normal leading-none opacity-70">
                        {head}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(cakeData.items || []).length ? (
                  (cakeData.items || []).map((item, index) => {
                    const isLast = index === cakeData.items.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={index} className="even:bg-blue-gray-50/50">
                        <td className={`${classes} max-w-[100px]`}>
                          <img
                            className="w-[100px] h-auto"
                            src={item.image}
                            width="100"
                            height="100"
                          />
                        </td>
                        <td className={`${classes} max-w-[100px]`}>
                          <span className="font-normal">{item.title}</span>
                        </td>
                        <td className={`${classes} max-w-[100px]`}>
                          <span className="font-normal">
                            {item.description}
                          </span>
                        </td>
                        <td className={`${classes} w-[50px]`}>
                          <span className="font-normal">{item.rating}</span>
                        </td>
                        <td className={`${classes} w-[100px]`}>
                          <a
                            onClick={() => {
                              dispatch(setSelectedCake(item));
                              router.push(`/cake/${item.id}`);
                            }}
                            className="font-normal mr-2 text-blue-500 cursor-pointer"
                          >
                            Edit
                          </a>
                          <a
                            onClick={() => setCakeId(item.id)}
                            className="font-normal text-red-500 cursor-pointer"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="text-center p-5" colSpan={5}>
                      Data Tidak Ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          <div className="w-full flex justify-between p-4 border-t border-blue-gray-100">
            <span>
              Page {page} of {cakeData.total_page}
            </span>
            <div>
              <button
                onClick={() => onHandlePagination("prev")}
                className={`rounded-lg border ${
                  page > 1
                    ? "text-blue-700 border-blue-700"
                    : "text-gray-400 border-gray-400"
                } py-1 px-4 mr-2`}
              >
                Prev
              </button>
              <button
                data-testid="next-button"
                onClick={() => onHandlePagination("next")}
                className={`rounded-lg border ${
                  page < cakeData.total_page
                    ? "text-blue-700 border-blue-700"
                    : "text-gray-400 border-gray-400"
                } py-1 px-4 mr-2`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const response = await getCakeLists(1);
    if (response.status === "SUCCESS")
      store.dispatch(addCakeList(response.data));
  }
);

export default Home;
