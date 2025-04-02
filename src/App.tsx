import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState<any[]>([]);
  const [regionKeyword, setRegionKeyword] = useState("");
  const [isMultipleRegion, setIsMultipleRegion] = useState(false);
  const [amount, setAmount] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [startPrice, setStartPrice] = useState<number | "">("");
  const [endPrice, setEndPrice] = useState<number | "">("");

  const getCrawlingData = () => {
    const body = {
      region_keyword: regionKeyword,
      is_multiple_region: isMultipleRegion,
      keyword: keyword,
      amount: amount,
      start_price: startPrice === "" ? 0 : startPrice,
      end_price: endPrice === "" ? 0 : endPrice,
    };

    axios
      .get("http://127.0.0.1:8000/crawl", { params: body })
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    switch (name) {
      case "regionKeyword":
        setRegionKeyword(value);
        break;
      case "isMultipleRegion":
        setIsMultipleRegion(checked); // checkbox는 checked로 처리
        break;
      case "amount":
        setAmount(value ? parseInt(value) : 0);
        break;
      case "keyword":
        setKeyword(value);
        break;
      case "startPrice":
        setStartPrice(value ? parseInt(value) : ""); // 빈 문자열 허용
        break;
      case "endPrice":
        setEndPrice(value ? parseInt(value) : ""); // 빈 문자열 허용
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      {message.length > 0 &&
        message.map((item, index) => (
          <div key={index}>
            <h2>제목 : {item.title}</h2>
            <p>가격 : {item.price}</p>
            <p>매물 링크 : {item.link}</p>
            <p>올린 시간 : {item.time}</p>
            <p>설명 : {item.description}</p>
            <p>채팅 : {item.chatting}</p>
            <p>조회수 : {item.watching}</p>
            <p>유저 이름 : {item.username}</p>
            <p>유저 링크 : {item.userlink}</p>
            <p>지역 : {item.location}</p>
          </div>
        ))}
      <input
        type="text"
        name="regionKeyword"
        value={regionKeyword}
        onChange={handleInputChange}
        placeholder="지역 키워드"
      />
      <input
        type="checkbox"
        name="isMultipleRegion"
        checked={isMultipleRegion}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="keyword"
        value={keyword}
        onChange={handleInputChange}
        placeholder="검색 키워드"
      />
      <input
        type="number"
        name="startPrice"
        value={startPrice}
        onChange={handleInputChange}
        placeholder="최소 가격"
      />
      <input
        type="number"
        name="endPrice"
        value={endPrice}
        onChange={handleInputChange}
        placeholder="최대 가격"
      />
      <button onClick={getCrawlingData}>찾기</button>
    </div>
  );
}

export default App;
