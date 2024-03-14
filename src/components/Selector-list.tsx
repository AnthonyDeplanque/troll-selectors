import { useEffect, useState } from 'react';
import Selector from './Selector';
import { SelectorHelpers } from './selector-helpers';

const SelectorList = () => {
  const numberOfSelectors = 10;
  const [values, setValues] = useState<boolean[]>([]);

  useEffect(() => {
    setValues(SelectorHelpers.createArrayOfRandomBooleans(numberOfSelectors, 4));
  }, []);

  return (
    <>
      <div className='main-container'>
        <div className='switches'>
          {values.length &&
            values.map((value, index) => (
              <Selector
                key={`selector-${index}`}
                toggle={value}
                label={`bug ${index}`}
                setToggle={() => SelectorHelpers.setToggle(index, numberOfSelectors, values, setValues)}
              />
            ))}
        </div>
      </div>
      <div className='response'>{values.every((value) => value === false) ? <p>ALL BUG RESOLVED !</p> : ''}</div>
    </>
  );
};

export default SelectorList;
