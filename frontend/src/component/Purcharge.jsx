import { useAtom } from "jotai";
import { initialTransform, selectedNum, selectedPieces } from "../store";
import axios from "axios";
import Loading from "./Loading";
import { useState } from "react";

const Purcharge = () => {
  const [tileNum, setTileNum] = useAtom(selectedNum);
  const [selectedTiles, setSelectedTiles] = useAtom(selectedPieces);
  const [transformvalue, setTransformvalue] = useAtom(initialTransform);
  const [isLoading, setIsLoading] = useState(false);
  const onPurcharge = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/cannafield/purcharge`,
        selectedTiles
      );
      console.log(response.data.msg);

      transformvalue.x1 > 0
        ? setTransformvalue((prev) => ({ ...prev, x1: prev.x1 - 1 }))
        : setTransformvalue((prev) => ({ ...prev, x2: prev.x2 + 1 }));
      setTimeout(() => {
        setSelectedTiles([]);
        setTileNum(0);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="bg-blue-50 absolute right-3 top-3 w-60 p-3  shadow-md shadow-slate-800">
        <div className="text-2xl text-blue-600 text-center py-2">
          <b>Purcharse</b>
        </div>
        <hr />
        <div className="py-3">{tileNum ? tileNum : "No"} Tiles Selected</div>

        {tileNum ? (
          <div
            className="flex h-8 items-center justify-center rounded-lg bg-blue-500 px-4  text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 select-none cursor-pointer"
            onClick={onPurcharge}
          >
            BUY
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Purcharge;
