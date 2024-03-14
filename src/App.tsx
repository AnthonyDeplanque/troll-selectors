import { Toaster } from 'sonner';
import SelectorList from './components/Selector-list';

function App() {
    console.log(process.env.GIVEAWAY_SECRET);
    return (
        <>
            <SelectorList />
            <Toaster />
        </>
    );
}

export default App;
