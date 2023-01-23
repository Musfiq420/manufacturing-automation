import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { H4, H_Sub, Sub1 } from '../common/customTexts';
import CustomDataTable from '../common/customDataTable';
import { BoxMedium } from '../common/customBox';


const TypeWiseMachineSummary = () => {

  const mcType = useSelector((state) => state.machinedb.typeWise);  

  return (
    <div>
        {/* <BoxMedium>
          <H4>Machine Summary</H4>
          <Sub1>Type-wise machine breakdown</Sub1>
        </BoxMedium> */}
        <CustomDataTable />
        
    </div>
  )
}

export default TypeWiseMachineSummary