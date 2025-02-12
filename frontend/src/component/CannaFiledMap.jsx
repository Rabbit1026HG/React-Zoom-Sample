import { useCallback, useEffect, useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Block from './Block';
import { useAtom } from 'jotai';
import { currentState, initialTransform, panstate } from '../store';
import axios from 'axios';
import Loading from './Loading';
import Control from './Control';

function CannaFiledMap() {
  const [blocks, setBlocks] = useState([]);
  const [minScale, setMinScale] = useState(0.1);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isPan, setIsPan] = useAtom(panstate);
  const [transformvalue, setTransformvalue] = useAtom(initialTransform);
  const bwidth = 75;
  const bheight = 75;
  const w_num = 20;
  const h_num = 10;
  const limitscale = 2;
  const [, setState] = useAtom(currentState);

  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerSize({
          width: entry.contentRect.width * 0.8,
          height: entry.contentRect.height * 0.8,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    containerSize.width / 7500 > containerSize.height / 3750
      ? setMinScale(containerSize.width / 7500)
      : setMinScale(containerSize.height / 3750);
    console.log('minScale: ', minScale);
    console.log('height: ', containerSize.height);
    console.log(containerSize.width / 7500);
    console.log(containerSize.height / 3750);
  }, [containerSize.width, containerSize.height, minScale]);

  console.log('Container Size: ', containerSize);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('api fetch');

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/cannafield`,
          transformvalue
        );
        setBlocks(response.data.cannafield);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [transformvalue]);

  const debouncedHandle = useCallback(
    (e) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const { scale, positionX, positionY } = e.state;
        const handleZoomChange = (scale, positionX, positionY) => {
          let x1 = 0,
            y1 = 0,
            x2 = 0,
            y2 = 0; // Initialize coordinates

          console.log('state:', scale, positionX, positionY);
          setState({ scale, x: positionX, y: positionY });

          if (scale >= limitscale) {
            // Calculate starting points x1 and y1 based on positionX and positionY
            if (positionX < 0) y1 = Math.floor(-positionX / (bwidth * scale));
            if (positionY < 0) x1 = Math.floor(-positionY / (bheight * scale));

            // Calculate ending points x2 and y2 by adding the visible portion based on scale
            x2 = Math.ceil(h_num / scale) + x1;
            y2 = Math.ceil(w_num / scale) + y1;

            // Adjust x1 and y1 if they exceed the grid boundaries
            if (h_num * 5 - x2 <= 0) {
              x1 += h_num * 5 - 1 - x2;
              x2 = h_num * 5 - 1;
            }
            if (w_num * 5 - y2 <= 0) {
              y1 += w_num * 5 - 1 - y2;
              y2 = w_num * 5 - 1;
            }
          } else {
            if (isPan) setIsPan(false);
            x1 = 0;
            y1 = 0;
            x2 = 0;
            y2 = 0;
          }

          // Update the transform values only if they have changed
          if (
            transformvalue.x1 !== x1 ||
            transformvalue.y1 !== y1 ||
            transformvalue.x2 !== x2 ||
            transformvalue.y2 !== y2
          ) {
            setTransformvalue({
              x1,
              y1,
              x2,
              y2,
            });
            console.log('call', x1, y1, x2, y2);
          }
        };
        handleZoomChange(scale, positionX, positionY);
      }, 100);
    },
    [
      setState,
      isPan,
      setIsPan,
      setTransformvalue,
      transformvalue.x1,
      transformvalue.x2,
      transformvalue.y1,
      transformvalue.y2,
    ]
  );

  const handlePan = () => {
    if (!isPan) {
      setIsPan(true);
    }
  };

  return (
    <div
      className='w-full h-screen flex flex-col items-center justify-center'
      ref={containerRef}
    >
      {!blocks.length && <Loading />}
      <TransformWrapper
        // wheel={{ smoothStep: 0.005 }}
        doubleClick={{ disabled: true }}
        initialScale={1}
        minScale={minScale}
        maxScale={8}
        onPanning={handlePan}
        onTransformed={debouncedHandle}
      >
        <div className='relative border-2 border-gray-400 rounded-md'>
          <Control />
          <TransformComponent
            wrapperStyle={{
              width: '80vw',
              height: '80vh',
            }}
          >
            <div
              id='board'
              className={isPan ? 'cursor-grabbing' : 'cursor-pointer'}
            >
              {blocks.length ? (
                blocks.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className=' border border-gray-300 text-sm !aspect-[1/1] rounded-md'
                    >
                      <Block
                        isShow={item.isShow}
                        num={index}
                        data={item?.pieces}
                        buyNum={item?.selectedNum}
                      />
                    </div>
                  );
                })
              ) : (
                <div className='bg-white'></div>
              )}
            </div>
          </TransformComponent>
        </div>
      </TransformWrapper>
    </div>
  );
}
export default CannaFiledMap;
