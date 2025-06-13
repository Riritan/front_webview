import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myApp.db');

export const initDatabase = async () => {
  try {
    await db.withTransactionAsync(async () => {
      // execAsunc -> Create, Insert
      // runAsync ->  INSERT, UPDATE, DELETE
      // getFirstAsync -> 쿼리 실행하고 첫행 반환
      // getAllAstnc -> 쿼리 실행하고 전체행 반환
      await db.execAsync(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);'
      );
      console.log('✅ 테이블이 성공적으로 생성되었거나 이미 존재합니다.');
    });
  } catch (error) {
    console.error('❌ 데이터베이스 초기화 중 오류 발생:', error);
  }
};

export { db };
