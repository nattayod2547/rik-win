import React, { useState, useEffect } from 'react';
import { FaHeart, FaTimes } from 'react-icons/fa';

const RandomChance = () => {
  const [result, setResult] = useState(null);
  const [count, setCount] = useState(0);
  const [storedResults, setStoredResults] = useState([]);
  const maxCount = 20; // จำนวนการสุ่มที่กำหนดไว้

  useEffect(() => {
    // อ่านจำนวนการสุ่มจาก localStorage เมื่อคอมโพเนนต์ถูกเรนเดอร์
    const savedCount = localStorage.getItem('randomCount');
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
    
    // อ่านข้อมูลผลลัพธ์ทั้งหมดจาก localStorage
    const savedResults = localStorage.getItem('results');
    if (savedResults) {
      setStoredResults(JSON.parse(savedResults));
    }
  }, []);

  useEffect(() => {
    // อัพเดต localStorage เมื่อ count หรือ storedResults เปลี่ยนแปลง
    localStorage.setItem('randomCount', count);
    localStorage.setItem('results', JSON.stringify(storedResults));
  }, [count, storedResults]);

  const handleClick = () => {
    if (count >= maxCount) {
      alert('คุณสุ่มครบ 20 ครั้งแล้ว');
      return;
    }

    const randomValue = Math.random() * 100; // สุ่มค่าในช่วง 0-100
    const newResult = randomValue < 45 ? 'success' : 'failure';
    setResult(newResult);

    // อัพเดตจำนวนการสุ่มและผลลัพธ์
    setCount(prevCount => prevCount + 1);
    setStoredResults(prevResults => [...prevResults, newResult]);
  };

  const handleReset = () => {
    localStorage.removeItem('randomCount');
    localStorage.removeItem('results');
    setCount(0);
    setResult(null);
    setStoredResults([]);
  };

  const renderIcon = (result) => {
    if (result === 'success') {
      return <FaHeart size={50} color="red" />;
    }
    return <FaTimes size={50} color="black" />;
  };

  return (
    <div className='grid text-center justify-center'>
        <div>
      <button className=' rounded-tl-3xl rounded-tr-lg rounded-br-3xl rounded-bl-lg w-32 h-12 bg-orange-400 mt-2' onClick={handleClick} disabled={count >= maxCount}>
        {count >= maxCount ? 'สุ่มครบ 20 ครั้งแล้ว' : 'สุ่มโชค'}
      </button>
      </div>
      <div className='grid text-center justify-center'>
        {result && renderIcon(result)}
      </div>
      <div className='w-40 h-12 border-2 border-rose-500 grid rounded-lg '>
        <p className='  '>จำนวนครั้งที่สุ่ม: {count}</p>
      </div>
      <div className='mt-1'>
      {count >= maxCount && (
        <button className=' bg-slate-600 rounded-lg w-20' onClick={handleReset}>ลบข้อมูล</button>
      )}
      </div>
      <div >
        <h3>ผลลัพธ์</h3>
        <div className='grid text-center justify-center border-2 border-blue-600'>
          {storedResults.map((result, index) => (
            <span className='border-2 border-blue-600' key={index} style={{ margin: '5px' }}>
              {renderIcon(result)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RandomChance;
