import { useControls } from "react-zoom-pan-pinch";
import { Icon } from "@iconify/react";
import { useAtom } from "jotai";
import { currentState } from "../store";
const Control = () => {
  const { zoomIn, zoomOut, setTransform } = useControls();
  const [state] = useAtom(currentState);

  const handleReset = () => {
    console.log("current state:", state);

    const { x, y, scale } = state;
    const centerX = 750;
    const centerY = 375;
    const minX = -13500;
    const minY = -6750;

    // Calculate the reset positions within bounds
    let newX = ((x - centerX) / scale) * 2 + centerX;
    let newY = ((y - centerY) / scale) * 2 + centerY;

    newX = Math.max(Math.min(newX, 0), minX);
    newY = Math.max(Math.min(newY, 0), minY);

    console.log(newX, newY);

    setTransform(newX, newY, 2);
  };

  return (
    <div className="absolute right-8 bottom-8 flex flex-col gap-2 p-1 z-50 border border-gray-400 rounded-lg bg-white bg-opacity-40">
      <div
        className="hover:cursor-pointer p-2 hover:bg-gray-500 hover:bg-opacity-40 flex justify-center items-center rounded-lg"
        onClick={() => {
          zoomIn();
        }}
      >
        <Icon icon="ph:plus" width={24} height={24} />
      </div>
      <div
        className="hover:cursor-pointer p-2 hover:bg-gray-500 hover:bg-opacity-40 flex justify-center items-center rounded-lg"
        onClick={handleReset}
      >
        <Icon icon="ph:hash-straight" width={24} height={24} />
      </div>
      <div
        className="hover:cursor-pointer p-2 hover:bg-gray-500 hover:bg-opacity-40 flex justify-center items-center rounded-lg"
        onClick={() => {
          zoomOut();
        }}
      >
        <Icon icon="ph:minus" width={24} height={24} />
      </div>
    </div>
  );
};

export default Control;
