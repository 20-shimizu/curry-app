import React, { useEffect, useState } from "react"
import "./Recipes.css"
import axios from "axios";

axios.defaults.timeout = 5000;

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
      const response = await axios.get('/recipes');
      setDataList(response.data);
    } catch (error) {
      console.error('エラー:', error);
    }
  };
  // ポーリング(1秒間隔)
  useEffect(() => {
    getDataList();
    const interval = setInterval(() => {
      getDataList();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const deleteData = async (id: number) => {
    const data = {
      id: id
    };
    try {
      const response = await axios.delete('/recipes/delete', {data});
      setDataList(response.data);
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div className="recipes">
      <h3>保存済みレシピ</h3>
      <div>{dataList.map(data =>
        <p key={data.id}>
          {data.id},{data.title}
          <span style={{ float: 'right' }}><button onClick={() => deleteData(data.id)}>削除</button></span>
        </p>
      )}</div>
    </div>
  )
};

export default Recipes;
