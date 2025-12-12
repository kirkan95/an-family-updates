import kirkJessica from "../content/2025/kirk-jessica.json";

const listOfArticles = [kirkJessica];
export let objList2025 = [];

listOfArticles.forEach((person) => {
  const obj = {
    objName: person[0]["special_values_name"],
    data: person,
  };
  objList2025.push(obj);
});
