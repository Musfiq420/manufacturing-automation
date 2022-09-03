import { useSelector } from "react-redux";
import CustomCards from "../common/customCards";
import CustomProgressBars from "../common/customProgressBar";


const UtilTypeWiseMachineSummary = () => {

    const mcUtilType = useSelector((state) => state.machinedb.utilTypeWise);

  return (
    <div>
        <h3>Type-wise Machine Utilization</h3>
        {/* {mcUtilType?<CustomCards data={mcUtilType} />:<p>no utilization data</p>} */}
        {mcUtilType?<CustomProgressBars data={mcUtilType} />:<p>no utilization data</p>}
    </div>
  )
}

export default UtilTypeWiseMachineSummary;