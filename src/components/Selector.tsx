import '../assets/switch.css';

interface SelectorProps {
    label: string;
    toggle: boolean;
    setToggle: () => void;
}

const Selector = (props: SelectorProps) => {
    const { toggle, label, setToggle } = props;

    return (
        <div className='switch-box'>
            <label className='switch'>
                <input type='checkbox' checked={!toggle} onChange={setToggle} />
                <span className='slider round'></span>
            </label>
            <span className={`message ${toggle ? 'ko' : ''}`}>{label}</span>
            {!toggle ? <span className='message ok'>Resolved !</span> : ''}
        </div>
    );
};

export default Selector;
