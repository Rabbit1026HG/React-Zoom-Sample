const expressAsyncHandler = require("express-async-handler");
const Cannafield = require("../../models/CannafieldModel");

let cannafieldData = [];

const getAllCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const results = await Cannafield.aggregate([
      {
        $project: {
          num: 1,
          pieces: 1,
          selectedNum: {
            $size: {
              $filter: {
                input: "$pieces",
                as: "piece",
                cond: {
                  $eq: ["$$piece.isSelected", true],
                },
              },
            },
          },
        },
      },
      { $sort: { num: 1 } },
    ]);
    const formattedResults = results.map((item) => {
      return {
        isShow: false,
        num: item.num,
        selectedNum: item.selectedNum,
        pieces: item.pieces,
      };
    });
    cannafieldData = formattedResults;
    res.status(200).json({ msg: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getCtrl = expressAsyncHandler(async (req, res) => {
  const { x1, y1, x2, y2 } = req.body;

  try {
    let flagData = Array(5000).fill(false);
    if (cannafieldData.length === 0) {
      const results = await Cannafield.aggregate([
        {
          $project: {
            num: 1,
            pieces: 1,
            selectedNum: {
              $size: {
                $filter: {
                  input: "$pieces",
                  as: "piece",
                  cond: {
                    $eq: ["$$piece.isSelected", true],
                  },
                },
              },
            },
          },
        },
        { $sort: { num: 1 } },
      ]);
      cannafieldData = results.map((item) => {
        return {
          isShow: false,
          num: item.num,
          selectedNum: item.selectedNum,
          pieces: item.pieces,
        };
      });
    }
    if (x1 != x2 || y1 != y2) {
      for (let i = Number(x1); i <= Number(x2); i++) {
        for (let j = Number(y1); j <= Number(y2); j++) {
          // Ensure index exists before assignment
          const index = i * 100 + j;
          flagData[index] = true;
        }
      }
    }

    const formattedResults = cannafieldData.map((item, index) => {
      if (!flagData[index]) {
        return {
          isShow: flagData[index],
          num: item.num,
          selectedNum: item.selectedNum,
        };
      }
      return {
        isShow: flagData[index],
        num: item.num,
        pieces: item.pieces,
      };
    });

    return res.status(200).json({ cannafield: formattedResults });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateCtrl = expressAsyncHandler(async (req, res) => {
  const updates = req.body;
  try {
    for (const update of updates) {
      const { blockId, pieceId } = update;

      // Update the specific piece's isSelected based on num and id
      await Cannafield.updateOne(
        { num: blockId, "pieces.id": pieceId }, // Filter by num and pieces.id
        { $set: { "pieces.$.isSelected": true } } // Update the isSelected field
      );
    }
    cannafieldData = [];
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.error("Error updating pieces:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { getAllCtrl, getCtrl, updateCtrl };
