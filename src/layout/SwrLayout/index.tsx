import { SWRConfig } from "swr";
import { ChildrenType } from "../../helper/types";
import { axiosPublic } from "../../../axios";

const fetcher = (url: string) => axiosPublic.get(url).then((res) => res.data);

const SwrLayout: React.FC<ChildrenType> = ({children} : ChildrenType) => {

    return <SWRConfig
        value={{
        fetcher
        }}
      >
        {children}
    </SWRConfig>
};
  
  export default SwrLayout;