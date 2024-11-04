import React, { useEffect, useState } from "react";
import axios from "axios";

const DeckContent = () => {
  const [decks, setDecks] = useState([]); // State để lưu trữ danh sách Deck
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái tải dữ liệu
  const [error, setError] = useState(null); // State để quản lý lỗi nếu có

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get("/api/decks"); // Đường dẫn tới API để lấy dữ liệu Deck
        setDecks(response.data); // Giả sử response.data chứa danh sách Deck
      } catch (err) {
        setError(err.message); // Lưu thông báo lỗi
      } finally {
        setLoading(false); // Đặt loading thành false khi hoàn tất
      }
    };

    fetchDecks(); // Gọi hàm fetchDecks
  }, []); // Chạy khi component mount

  if (loading) return <div>Loading...</div>; // Hiển thị loading khi đang tải
  if (error) return <div>Error: {error}</div>; // Hiển thị lỗi nếu có

  return (
    <div>
      <h4 className="font-bold text-blue-600 mb-4">Decks</h4>
      {decks.length === 0 ? (
        <div>No decks available.</div> // Thông báo nếu không có Deck nào
      ) : (
        <ul>
          {decks.map((deck) => (
            <li key={deck.id} className="mb-2">
              <h5 className="font-semibold">{deck.name}</h5>{" "}
              {/* Hiển thị tên Deck */}
              <p>{deck.description}</p> {/* Hiển thị mô tả Deck */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeckContent;
