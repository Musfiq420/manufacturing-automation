import { useSelector } from "react-redux";
import CustomProgressBars from "../common/customProgressBar";
import { H4 } from "../common/customTexts";


const UtilTypeWiseMachineSummary = () => {

    const mcUtilType = useSelector((state) => state.machinedb.utilTypeWise);

  return (
    <div>
        <H4>Type-wise Machine Utilization</H4>
        {/* {mcUtilType?<CustomCards data={mcUtilType} />:<p>no utilization data</p>} */}
        {mcUtilType?<CustomProgressBars data={mcUtilType} />:<p>no utilization data</p>}
    </div>
  )
}

export default UtilTypeWiseMachineSummary;