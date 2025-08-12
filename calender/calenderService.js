const db = require('../../config/database'); // データベース接続設定をインポート

class CalendarService {
  // イベントを取得するメソッド
  async getEvents() {
    try {
      const events = await db.query('SELECT * FROM events'); // データベースからイベントを取得
      return events;
    } catch (error) {
      throw new Error('Error fetching events: ' + error.message);
    }
  }

  // 新しいイベントを追加するメソッド
  async addEvent(eventData) {
    try {
      const result = await db.query('INSERT INTO events SET ?', eventData); // データベースに新しいイベントを追加
      return result.insertId; // 追加したイベントのIDを返す
    } catch (error) {
      throw new Error('Error adding event: ' + error.message);
    }
  }

  // イベントを削除するメソッド
  async deleteEvent(eventId) {
    try {
      await db.query('DELETE FROM events WHERE id = ?', [eventId]); // 指定したIDのイベントを削除
    } catch (error) {
      throw new Error('Error deleting event: ' + error.message);
    }
  }
}

module.exports = new CalendarService(); // CalendarServiceのインスタンスをエクスポート