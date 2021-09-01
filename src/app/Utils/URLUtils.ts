import { QueryParams } from "../model/QueryParams";

export class URLUtils{
  extractTopicIdAndQueryParamsFromActivatedRoute(params, queryParams): QueryParams{
    let result = new QueryParams();
    result.topicId = params["topicId"];
    result.p = queryParams["p"];
    result.tags = queryParams["tags"];
    result.s = queryParams["s"];
    result.e = queryParams["e"];
    result.order = queryParams["order"];
    result.sortBy = queryParams["sortBy"];
    return result;
  }

  extractTopicIdAndQueryParamsFromRouter(url): QueryParams{
    // /topics/Dating/posts?p=1&s=2021-06-15&e=2021-08-31&sortBy=posts&order=desc
    // /topics/Dating/posts?p=1&tags=ok&s=2021-06-15&e=2021-08-31&sortBy=posts&order=desc
    let result = new QueryParams();

    result.topicId = url.split("/")[2];

    result.p = url.split("/")[3].split("&")[0].split("=")[1];

    if (url.indexOf("tags") < 0 && url.includes("&s=")){
      result.s = url.split("/")[3].split("&")[1].split("=")[1];
      result.e = url.split("/")[3].split("&")[2].split("=")[1];
      result.sortBy = url.split("/")[3].split("&")[3].split("=")[1];
      result.order = url.split("/")[3].split("&")[4].split("=")[1];
    }
    else if (url.indexOf("tags") >= 0 && url.includes("&s=")){
      result.tags = url.split("/")[3].split("&")[1].split("=")[1];
      result.s = url.split("/")[3].split("&")[2].split("=")[1];
      result.e = url.split("/")[3].split("&")[3].split("=")[1];
      result.sortBy = url.split("/")[3].split("&")[4].split("=")[1];
      result.order = url.split("/")[3].split("&")[5].split("=")[1];
    }

    return result;
  }
}
