export const randomNumber = (max: number, min?: number) => Math.floor(Math.random() * max) + (min ? min : 1);

export const createArrayOfRandomBooleans = (length: number, limit: number) => {
    const array = Array.from({ length: length }).map(() => false);
    const indexesToChange = Array.from({
        length: randomNumber(limit),
    }).map(() => randomNumber(length - 1));
    indexesToChange.forEach((index) => (array[index] = true));
    return array;
};

export const setToggle = (
    switchedToggleIndex: number,
    numberOfSelectors: number,
    values: boolean[],
    setValues: (value: React.SetStateAction<boolean[]>) => void,
) => {
    // get values array indexes that can be changed (not the selected one and not a "false" value)
    const indexThatCanBeChanged: number[] = values
        .map((value, index: number) => {
            return { value, index };
        })
        .filter((item) => item.index !== switchedToggleIndex)
        .filter((item) => item.value === false)
        .map((item) => item.index);

    // Determine how many indexes are to change
    const indexesLength = randomNumber(2);

    // Change randomly values
    if (indexThatCanBeChanged.length > indexesLength) {
        while (indexThatCanBeChanged.length !== indexesLength || indexesLength > indexThatCanBeChanged.length) {
            const arrayIndexToSplice = randomNumber(indexThatCanBeChanged.length);
            indexThatCanBeChanged.splice(arrayIndexToSplice, 1);
        }
    }

    // set new values
    setValues((previousValues) => {
        const newValuesArray = [...previousValues];
        indexThatCanBeChanged.forEach((index) => (newValuesArray[index] = !newValuesArray[index]));
        newValuesArray[switchedToggleIndex] = !newValuesArray[switchedToggleIndex];
        return newValuesArray;
    });

    const checkIfHalfValuesAreResolved = values.filter((value) => value === false).length <= numberOfSelectors / 2;

    if (checkIfHalfValuesAreResolved) {
        const chancesToTroll = randomNumber(100);
        if (chancesToTroll > 75) {
            setValues((previousValues) => {
                const newValuesArray = previousValues.map((value) => !value);
                return newValuesArray;
            });
        }
    }
};
