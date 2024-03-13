import { useEffect, useState } from 'react';
import Selector from './Selector';
import { createArrayOfRandomBooleans, setToggle } from './selector-helpers';

const SelectorList = () => {
    const numberOfSelectors = 10;
    const [values, setValues] = useState<boolean[]>([]);

    useEffect(() => {
        setValues(createArrayOfRandomBooleans(numberOfSelectors, 4));
    }, []);

    return (
        <>
            <div>
                {values.length &&
                    values.map((value, index) => (
                        <Selector
                            key={`selector-${index}`}
                            toggle={value}
                            label={`bug ${index}`}
                            setToggle={() => setToggle(index, numberOfSelectors, values, setValues)}
                        />
                    ))}
            </div>
            {values.every((value) => value === false) ? (
                ''
            ) : (
                <div>
                    <p>ALL BUG RESOLVED !</p>
                </div>
            )}
        </>
    );
};

export default SelectorList;
