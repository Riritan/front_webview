import { db } from './db'; // 위에서 수정한 db.js에서 db 객체를 가져옵니다.

/**
 * 새로운 아이템을 'items' 테이블에 추가합니다.
 * @param {string} name 
 * @returns {Promise<number>}
 */
export const createItem = async (name) => {
  const result = await db.runAsync('INSERT INTO items (name) VALUES (?);', name);
  return result.lastInsertRowId; // 마지막으로 삽입된 행의 ID를 반환합니다.
};

/**
 * 'items' 테이블의 모든 아이템을 조회합니다.
 * @returns {Promise<Array<object>>} - 성공 시 모든 아이템 객체의 배열을 resolve하는 Promise.
 */
export const readItems = async () => {
  // getAllAsync는 SELECT 쿼리에 사용되며, 결과 객체들의 배열을 반환합니다.
  const allRows = await db.getAllAsync('SELECT * FROM items;');
  return allRows;
};

/**
 * 특정 ID를 가진 아이템의 이름을 수정합니다.
 * @param {number} id - 수정할 아이템의 ID.
 * @param {string} name - 새로운 아이템의 이름.
 * @returns {Promise<number>} - 성공 시 영향을 받은 행의 수를 resolve하는 Promise.
 */
export const updateItem = async (id, name) => {
  const result = await db.runAsync('UPDATE items SET name = ? WHERE id = ?;', name, id);
  return result.changes; // 변경된 행의 수를 반환합니다.
};

/**
 * 특정 ID를 가진 아이템을 'items' 테이블에서 삭제합니다.
 * @param {number} id - 삭제할 아이템의 ID.
 * @returns {Promise<number>} - 성공 시 영향을 받은 행의 수를 resolve하는 Promise.
 */
export const deleteItem = async (id) => {
  const result = await db.runAsync('DELETE FROM items WHERE id = ?;', id);
  return result.changes; // 삭제된 행의 수를 반환합니다.
};
