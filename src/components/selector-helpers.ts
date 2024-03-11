export const createArrayOfRandomBooleans = (length: number, trollLimit: number) => {
    const array = Array.from({ length: length }).map(() => false);
    const indexesToChange = Array.from({
        length: Math.floor(Math.random() * trollLimit) + 1,
    }).map(() => Math.floor(Math.random() * length) + 1);
    indexesToChange.forEach((index) => (array[index] = true));
    return array;
};

export const setToggle = (
    switchedToggleIndex: number,
    numberOfSelectors: number,
    values: boolean[],
    setValues: (value: React.SetStateAction<boolean[]>) => void,
) => {
    console.log(switchedToggleIndex, numberOfSelectors, values);

    // get values array indexes that can be changed (not the selected one and not a "false" value)
    const indexThatCanBeChanged: number[] = values
        .filter((_, index: number) => index !== switchedToggleIndex)
        .filter((value: boolean) => value === false)
        .map((_, index: number) => index);

    // Determine how many indexes are to change
    const indexesLength = Math.floor(Math.random() * 2) + 1;

    // Change randomly values
    while (indexThatCanBeChanged.length !== indexesLength || indexesLength > indexThatCanBeChanged.length) {
        const arrayIndexToSplice = Math.floor(Math.random() * (indexThatCanBeChanged.length + 1));
        indexThatCanBeChanged.splice(arrayIndexToSplice, 1);
    }

    // set new values
    setValues((previousValues) => {
        const newValuesArray = [...previousValues];
        indexThatCanBeChanged.forEach((index) => (newValuesArray[index] = !newValuesArray[index]));
        newValuesArray[switchedToggleIndex] = !newValuesArray[switchedToggleIndex];
        return newValuesArray;
    });

    // If all is false, game is over, we don't want that so we'll change randomly one value index
    if (!values.some(() => true)) {
        let indexToSetToTrue: number;
        do {
            indexToSetToTrue = Math.floor(Math.random() * numberOfSelectors) + 1;
        } while (indexToSetToTrue === switchedToggleIndex);
        setValues((previousValues) => {
            const newValuesArray = [...previousValues];
            newValuesArray[indexToSetToTrue] = true;
            return newValuesArray;
        });
    }
};
