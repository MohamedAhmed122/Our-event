import sampleData from "./SampleData";
import { delay } from "../redux/Async/async.utils";

export const fetchData = () => {
  return delay(1000).then(() => {
    return Promise.resolve(sampleData);
  });
};
