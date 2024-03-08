import { useEffect, useState } from "react";
import Selector from "./Selector";


const SelectorList = () => {


  const createArrayOfBooleans = (length: number) => Array.from({ length: length }).map(() => Math.floor(Math.random() * 100) % 2 === 0);

  const numberOfSelectors = 10;
  const [values, setValues] = useState<boolean[]>([]);

  useEffect(() => {
    setValues(createArrayOfBooleans(numberOfSelectors))
  }, [])

  const setToggle = (previousIndex: number) => {
    const numberOfIndexToChange = Math.floor(Math.random() * 2) + 2;
    const indexesToChange = Array.from({ length: numberOfIndexToChange }).map(() => {
      let indexToChange: number;
      do {
        indexToChange = Math.floor(Math.random() * values.length)
      }
      while (indexToChange === previousIndex);
      return indexToChange
    });
    indexesToChange.push(previousIndex);
    setValues((previousValues) => {
      const newValuesArray = [...previousValues];
      indexesToChange.forEach((indexToChange) => newValuesArray[indexToChange] = !newValuesArray[indexToChange])
      return newValuesArray
    })
    if (values.some(() => true)) {
      const indexToSetToTrue = Math.floor(Math.random() * numberOfSelectors)
      setValues((previousValues) => {
        const newValuesArray = [...previousValues]
        newValuesArray[indexToSetToTrue] = true;
        return newValuesArray
      })
    }


  }


  return <div>
    {
      values.length ?
        values.map((value, index) => {
          return <Selector key={`selector-${index}`}
            toggle={value}
            label={`bug ${105 + index}`}
            setToggle={() => setToggle(index)} />
        })
        : ""
    }
  </div>
}

export default SelectorList;