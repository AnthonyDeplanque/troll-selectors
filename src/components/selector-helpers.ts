import { toast } from 'sonner';

export class SelectorHelpers {

    public static readonly RANDOM_TO_WIN: number = 250;
    public static readonly FIXED_VALUE_TO_WIN: number = 5;
    public static readonly CHANCES_TO_TROLL: number = 100;

    public static readonly MAX_INDEX_TO_CHANGE: number = 3;

    public static readonly TROLL_TOASTER_DURATION: number = 500;
    public static readonly MESSAGE_TOASTER_DURATION: number = 1500;

    public static randomNumber(max: number, min?: number): number {
        return Math.floor(Math.random() * max) + (min ? min : 1);
    }

    /**
     * returns an array of "length" iterations of false values, with "limit" numbers of random indexes set to true
     * @param length 
     * @param limit 
     * @returns 
     */
    public static createArrayOfRandomBooleans(length: number, limit: number) {
        const array = Array.from({ length: length }).map(() => false);
        const indexesToChange = Array.from({
            length: SelectorHelpers.randomNumber(limit),
        }).map(() => SelectorHelpers.randomNumber(length - 1));
        indexesToChange.forEach((index) => (array[index] = true));
        return array;
    }

    /**
     * return three quarters of a numeric value
     * @param value 
     * @returns 
     */
    public static getThreeQuarters(value: number): number {
        return (value / 4) * 3;
    }

    /**
     * return half of a numeric value
     * @param value 
     * @returns 
     */
    public static getHalf(value: number): number {
        return (value / 2);
    }

    /**
     * Global function to set toggles to the new value
     * change randomly some values
     * display a toaster when user is trolled by random events
     * @param switchedToggleIndex 
     * @param numberOfSelectors 
     * @param values 
     * @param setValues 
     */
    public static setToggle(
        switchedToggleIndex: number,
        numberOfSelectors: number,
        values: boolean[],
        setValues: (value: React.SetStateAction<boolean[]>) => void,
    ) {
        // check how much true values are in
        const numberOfTrue = values.filter((value) => value === true).length;

        // array of indexes that can be changed, depending on the number of true values and omitting the toggle switched by user
        const indexThatCanBeChanged: number[] = values
            .map((value, index: number) => {
                return { value, index };
            })

            // if number of true is superior of the half of the length of the array, or if the item value is false
            .filter((item) => numberOfTrue >= SelectorHelpers.getHalf(numberOfSelectors) || item.value === false)
            .filter((item) => item.index !== switchedToggleIndex)
            .map((item) => item.index);

        // Determine how many indexes are to change
        const indexesLength = SelectorHelpers.randomNumber(SelectorHelpers.MAX_INDEX_TO_CHANGE);

        // Change randomly values
        if (indexThatCanBeChanged.length > indexesLength) {
            while (indexThatCanBeChanged.length !== indexesLength || indexesLength > indexThatCanBeChanged.length) {
                const arrayIndexToSplice = SelectorHelpers.randomNumber(indexThatCanBeChanged.length);
                indexThatCanBeChanged.splice(arrayIndexToSplice, 1);
            }
        }

        // set new values with the useState method from React
        setValues((previousValues) => {
            const newValuesArray = [...previousValues];
            indexThatCanBeChanged.forEach((index) => (newValuesArray[index] = !newValuesArray[index]));
            newValuesArray[switchedToggleIndex] = !newValuesArray[switchedToggleIndex];
            return newValuesArray;
        });

        // Check if half of the values are false.
        const checkIfHalfValuesAreResolved = values.filter((value) => value === false).length >= SelectorHelpers.getHalf(numberOfSelectors);

        // If true, we randomly troll user :*)
        if (checkIfHalfValuesAreResolved) {

            const chancesToTroll = SelectorHelpers.randomNumber(SelectorHelpers.CHANCES_TO_TROLL);
            if (chancesToTroll > SelectorHelpers.getThreeQuarters(SelectorHelpers.CHANCES_TO_TROLL)) {

                // readonly array of toaster position
                const positionList = ['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right'] as const

                const trollToasterPosition = (positionList)[chancesToTroll % positionList.length];

                // randomly determine if message is the troll or the win one
                const chanceToMessage = SelectorHelpers.randomNumber(SelectorHelpers.RANDOM_TO_WIN) === SelectorHelpers.FIXED_VALUE_TO_WIN;

                // secret message is in the .env
                const secretMessage = process.env.GIVEAWAY_SECRET;

                chanceToMessage
                    ? toast.success(secretMessage, { duration: SelectorHelpers.TROLL_TOASTER_DURATION, position: 'bottom-center' })
                    : toast.error('TROLLED', { duration: SelectorHelpers.MESSAGE_TOASTER_DURATION, position: trollToasterPosition });

                // if trolled, we have to re-set the values with new ones
                setValues((previousValues) => {
                    // We invert all values except the user-selected one
                    const newValuesArray = previousValues.map((value, index) => {
                        if (index === switchedToggleIndex) {
                            return value;
                        } else {
                            if (value) {
                                return value;
                            } else {
                                return !value;
                            }
                        }
                    });
                    return newValuesArray;
                });
            }
        }
    }

}
