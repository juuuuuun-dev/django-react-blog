import { useLocation, useHistory } from "react-router-dom";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}



export const queryStringify = (queries: any): string => {
  let query = '';
  const arr: string[] = [];
  for (let [key, value] of Object.entries(queries)) {
    if (value) {
      arr.push(`${key}=${value}`);
    }
  }
  query = arr.join('&');
  return query;
}

interface IPushHistoryProps {
  pathname: string;
  query: {
    page?: string | number | null;
    search?: string | null;
  }
}

export const useHistoryPushWithQuery = ({ pathname, query }: IPushHistoryProps): void => {
  // const history = useHistory();
  // const pushLocation = {
  //   pathname,
  //   search: queryStringify(query)
  // }
  // history.push(pushLocation);
}