const RealtimeData = require("../models/realtimeDataModel");

const getRealtimeData = async (req, res) => {
  const { created_by } = req.body;
  try {
    const realtimeData = await RealtimeData.find({
      created_by: created_by,
    })
      .sort({ createdAt: -1 })
      .limit(2000);
    res.status(200).json(realtimeData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getRealtimeData };
