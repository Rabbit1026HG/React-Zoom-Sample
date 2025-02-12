const blocksData = [];

for (let i = 0; i < 9000; i++) {
  const pieces = [];
  for (let j = 0; j < 25; j++) {
    pieces.push({
      id: j,
      status: Math.random() > 0.8 ? "solid" : "available", // Rnadomly mark some blocks as solid
      isSelected: false,
    });
  }
  blocksData.push({
    id: i,
    pieces: pieces,
    isShow: false,
  });
}

export default blocksData;
