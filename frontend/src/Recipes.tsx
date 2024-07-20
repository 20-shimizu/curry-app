import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import "./Recipes.css"
import axios from "axios";

axios.defaults.timeout = 5000;

type DataType = {
  id: number;
  title: string;
  ingredients: string;
  how_to_make: string;
  point: string;
  image_path: string;
}
type RecipesProps = {
  setSelectedRecipe: React.Dispatch<React.SetStateAction<DataType>>;
}

const Recipes: React.FC<RecipesProps> = ({setSelectedRecipe}) => {
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
      <div className="list">
        <h3>保存済みレシピ</h3>
        <Link to="/" >
        <button className="recipesSearch-button">レシピ検索</button>
        </Link>
      </div>
      <div className="recipe-list">
        {dataList.map(data => (
          <div key={data.id} className="recipe-item">
            <img src={`${process.env.PUBLIC_URL}/vbk.png`} alt="カレー" className="recipe-image" />
            <ReactMarkdown className="recipe-title">{data.title}</ReactMarkdown>
            <button onClick={() => deleteData(data.id)} className="delete-button">削除</button>
            <Link to="/recipe"><button onClick={() => setSelectedRecipe(data)} className="delete-button">詳細</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
