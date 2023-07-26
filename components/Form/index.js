import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { addCake, updateCake } from "@/provider/cakes";

import { setSelectedCake } from "@/store/cakeSlice";

import { DEFAULT_CAKE_FIELDS } from "@/constants";

function CakeForm() {
  const { selectedCake } = useSelector((state) => state.cakes);
  const dispatch = useDispatch();
  const router = useRouter();
  const photoRef = useRef();
  const [cakeData, setCakeData] = useState(DEFAULT_CAKE_FIELDS);

  useEffect(() => {
    setCakeData(selectedCake);
  }, []);

  const isAbleToSave = () =>
    cakeData.title && cakeData.description && cakeData.image && cakeData.rating;

  const onHandleFileChange = (e) => {
    const imageRef = ref(storage, `assets/${photoRef.current.files[0].name}`);
    uploadBytes(imageRef, photoRef.current.files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setCakeData((prev) => ({ ...prev, image: url }));
      });
    });
  };

  const onSaveCakeData = async (e) => {
    e.preventDefault();

    let response = {};

    if (selectedCake.id) {
      response = await updateCake(cakeData, selectedCake.id);
    } else {
      response = await addCake(cakeData);
    }

    if (response.status == "SUCCESS") {
      if (selectedCake.id) {
        alert("Berhasil Merubah Cake");

        dispatch(setSelectedCake(DEFAULT_CAKE_FIELDS));
      } else {
        alert("Berhasil Menambahkan Cake");
      }
      router.push("/");
    } else {
      alert(response.message);
    }
  };

  return (
    <form onSubmit={onSaveCakeData}>
      <div className="bg-white border border-b border-gray-900/10 rounded-md p-12">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="janesmith"
                  value={cakeData.title}
                  onChange={(e) =>
                    setCakeData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows="3"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={cakeData.description}
                onChange={(e) =>
                  setCakeData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              ></textarea>
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Rating
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="rating"
                  id="rating"
                  className="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="9.5"
                  value={cakeData.rating}
                  onChange={(e) =>
                    setCakeData((prev) => ({
                      ...prev,
                      rating: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              {cakeData.image ? (
                <img
                  className="w-40 h-auto border rounded-lg"
                  src={cakeData.image}
                />
              ) : (
                <svg
                  className="h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <input
                type="file"
                className="hidden"
                ref={photoRef}
                onChange={onHandleFileChange}
                accept="image/png, image/jpeg"
              />
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault();
                  photoRef.current.click();
                }}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => {
            dispatch(setSelectedCake(DEFAULT_CAKE_FIELDS));
            router.push("/");
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`rounded-md ${
            isAbleToSave()
              ? "bg-blue-700 hover:bg-blue-800 text-white"
              : "bg-white text-gray-400 border border-gray-400 cursor-not-allowed"
          } px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default CakeForm;
