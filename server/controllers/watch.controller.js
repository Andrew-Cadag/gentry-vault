const pool = require('../config/database');

exports.getAllWatches = async (req, res) => {
  try {
    
    const sql = "SELECT `id`, `brand`, `model`, `reference_number`, `price`, `condition`, `status`, `image_url` FROM `watches` WHERE `user_id` = ?";
    const [watches] = await pool.query(sql, [req.userData.userId]);
    res.json(watches);
  } catch (error) {
    console.error("Error in getAllWatches:", error); 
    res.status(500).send({ message: 'Error fetching watches', error });
  }
};

exports.createWatch = async (req, res) => {
  const { brand, model, reference_number, price, condition, status, image_url } = req.body;
  
  const sql = "INSERT INTO `watches` (`user_id`, `brand`, `model`, `reference_number`, `price`, `condition`, `status`, `image_url`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [req.userData.userId, brand, model, reference_number, price, condition, status, image_url];

  try {
    const [result] = await pool.query(sql, values);
    res.status(201).send({ message: 'Watch added', watchId: result.insertId });
  } catch (error) {
    console.error("Error in createWatch:", error);
    res.status(500).send({ message: 'Error creating watch', error });
  }
};

exports.updateWatch = async (req, res) => {
  const { id } = req.params;
  const { brand, model, reference_number, price, condition, status, image_url } = req.body;
  
  const sql = `
    UPDATE watches 
    SET brand = ?, model = ?, reference_number = ?, price = ?, \`condition\` = ?, status = ?, image_url = ?
    WHERE id = ? AND user_id = ?
  `;
  const values = [brand, model, reference_number, price, condition, status, image_url, id, req.userData.userId];

  try {
    const [result] = await pool.query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Watch not found or user not authorized.' });
    }
    res.status(200).send({ message: 'Watch updated successfully.' });
  } catch (error) {
    console.error("Error in updateWatch:", error);
    res.status(500).send({ message: 'Error updating watch', error });
  }
};

exports.deleteWatch = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM watches WHERE id = ? AND user_id = ?', [id, req.userData.userId]);
    res.status(200).send({ message: 'Watch deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting watch', error });
  }
};