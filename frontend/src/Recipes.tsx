import React, { useEffect, useState } from "react"
import "./Recipes.css"

type DataType = {
  id: number;
  title: string;
  ingredients: string;
  how_to_make: string;
  point: string;
}

const Recipes = () => {
  const [dataList, setDataList] = useState<DataType[]>([]);

  const getDataList = async () => {
    try {
      const response = await fetch('/recipes');
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.error('エラー:', error);
    }
  };
  // ポーリング(1秒間隔)
  useEffect(() => {
    getDataList();
    const interval = setInterval(() => {
      getDataList();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="recipes">
      <h3>保存済みレシピ</h3>
      <p>{dataList.map(data =>
        <p>{data.id},{data.title}</p>
      )}</p>
    </div>
  )
};

export default Recipes;
