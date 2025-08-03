import pool from '../config/database.js';

// Updated to handle pagination
export const getAllWatches = async (req, res) => {
  try {
    // Get page and limit from query params, with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const offset = (page - 1) * limit;

    // First, get the total count of all watches for this user
    const countSql = "SELECT COUNT(*) as total FROM `watches` WHERE `user_id` = ?";
    const [countRows] = await pool.query(countSql, [req.userData.userId]);
    const totalWatches = countRows[0].total;
    const totalPages = Math.ceil(totalWatches / limit);

    // Then, get the paginated data
    const dataSql = "SELECT `id`, `brand`, `model`, `reference_number`, `quantity`, `price`, `condition`, `status`, `image_url` FROM `watches` WHERE `user_id` = ? LIMIT ? OFFSET ?";
    const [watches] = await pool.query(dataSql, [req.userData.userId, limit, offset]);

    // Send back both the data for the current page and the pagination info
    res.json({
      watches,
      pagination: {
        currentPage: page,
        totalPages,
        totalWatches
      }
    });

  } catch (error) {
    console.error("Error in getAllWatches:", error); 
    res.status(500).send({ message: 'Error fetching watches', error });
  }
};

// --- NO CHANGES TO THE FUNCTIONS BELOW ---

export const createWatch = async (req, res) => {
  const { brand, model, reference_number, quantity, price, condition, status, image_url } = req.body;
  const sql = "INSERT INTO `watches` (`user_id`, `brand`, `model`, `reference_number`, `quantity`, `price`, `condition`, `status`, `image_url`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [req.userData.userId, brand, model, reference_number, quantity, price, condition, status, image_url];

  try {
    const [result] = await pool.query(sql, values);
    res.status(201).send({ message: 'Watch added', watchId: result.insertId });
  } catch (error) {
    console.error("Error in createWatch:", error);
    res.status(500).send({ message: 'Error creating watch', error });
  }
};

export const updateWatch = async (req, res) => {
  const { id } = req.params;
  const { brand, model, reference_number, quantity, price, condition, status, image_url } = req.body;
  
  const sql = `
    UPDATE watches 
    SET brand = ?, model = ?, reference_number = ?, quantity = ?, price = ?, \`condition\` = ?, status = ?, image_url = ?
    WHERE id = ? AND user_id = ?
  `;
  const values = [brand, model, reference_number, quantity, price, condition, status, image_url, id, req.userData.userId];

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

export const deleteWatch = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM watches WHERE id = ? AND user_id = ?', [id, req.userData.userId]);
    res.status(200).send({ message: 'Watch deleted' });
  } catch (error) {
    console.error("Error in deleteWatch:", error);
    res.status(500).send({ message: 'Error deleting watch', error });
  }
};
