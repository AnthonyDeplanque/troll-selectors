import { Toaster } from 'sonner';
import SelectorList from './components/Selector-list';

function App() {
    return (
        console.log(process.env.GIVEAWAY_SECRET);
        <>
            <SelectorList />
            <Toaster />
        </>
    );
}

export default App;
