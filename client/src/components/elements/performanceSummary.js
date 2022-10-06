//weekly, monthly, 3 months, 6 months
import React, { useState } from 'react';
import { CustomToggleGroupBig } from '../common/customToggleGroup';
import { FlexRowCenterBig } from '../common/customBox';
import DailyPerformanceReport from './dailyPerformanceReport';
import { DateRangeTrendAnalysis } from './dateRangeTrendAnalysis';

const PerformanceSummary = () => {
    const [dept, setDept] = useState('Cutting');

    const handleSelectDept = (event, newValue) => {
      if(newValue !== null)
        setDept(newValue);
    };


  return (
    <>
      <FlexRowCenterBig>
        <CustomToggleGroupBig
          data={['Cutting', 'Embroidery', 'Printing', 'Sewing', 'Finishing']}
          value={dept}
          handleSelectDept={handleSelectDept}
          />
      </FlexRowCenterBig>

      <DailyPerformanceReport dept={dept} />
      
      <DateRangeTrendAnalysis dept={dept} />
    </>
      
  )
}

export default PerformanceSummary