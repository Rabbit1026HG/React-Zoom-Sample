import { useAtom } from "jotai";
import PropTypes from "prop-types";
import { useState } from "react";
import { panstate, selectedNum, selectedPieces } from "../store";

function Block({ isShow, num, data, buyNum }) {
  const [isSelect, setIsSelect] = useState(Array(9).fill(false));
  const [isPan, setIsPan] = useAtom(panstate);
  const [tileNum, setTileNum] = useAtom(selectedNum);
  const [, setSelectedTiles] = useAtom(selectedPieces);
  const colors = [
    "bg-white",
    "bg-green-200",
    "bg-green-400",
    "bg-green-600",
    "bg-green-800",
    "bg-green-900",
  ];

  return (
    <div className={isShow ? "board1 !aspect-[1/1] " : ""}>
      {isShow ? (
        data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-center items-center rounded-md border border-gray-200 ${
              item.isSelected
                ? "bg-green-400"
                : isSelect[index]
                ? "bg-gray-400 hover:cursor-pointer hover:bg-gray-400"
                : "bg-gray-50 hover:cursor-pointer hover:bg-gray-300"
            }`}
            onClick={() => {
              console.log("isPan", isPan);
              if (isPan) {
                setIsPan(false);
                return;
              }
              if (item.isSelected) {
                return;
              }
              // console.log("click");
              if (isSelect[index]) {
                setTileNum(tileNum - 1);
                setSelectedTiles((prevSelectedTiles) =>
                  prevSelectedTiles.filter(
                    (tile) => tile.blockId !== num || tile.pieceId !== index
                  )
                );
              } else {
                setTileNum(tileNum + 1);
                setSelectedTiles((prevSelectedTiles) => [
                  ...prevSelectedTiles,
                  {
                    blockId: num,
                    pieceId: index,
                  },
                ]);
              }

              const nextSelect = isSelect.slice();
              nextSelect[index] = !isSelect[index];
              setIsSelect(nextSelect);
            }}
          ></div>
        ))
      ) : (
        <div
          className={`${
            colors[Math.ceil(buyNum / 2)]
          } flex justify-center items-center !aspect-[1/1] rounded-md`}
        ></div>
      )}
    </div>
  );
}

Block.propTypes = {
  isShow: PropTypes.bool.isRequired,
  num: PropTypes.number.isRequired,
  buyNum: PropTypes.number,
  data: PropTypes.array,
};

export default Block;
