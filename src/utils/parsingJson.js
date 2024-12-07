import kirkJessica from "../content/kirk-jessica.json";
import perryElise from "../content/perry-elise.json";
import arnoldLauraArie from "../content/arnold-laura-arie.json";
import monica from "../content/monica.json";

const listOfArticles = [kirkJessica, perryElise, arnoldLauraArie, monica];
export let objList = [];

listOfArticles.forEach((article) => {
  const obj = {
    objName: article[0]["special_values_name"],
    data: article,
  };
  objList.push(obj);
});
