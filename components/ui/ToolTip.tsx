import { useState } from 'react';

const ToolTip = ({ show = true }) => {
    const [visible, setVisible] = useState(false);


    return (
        <div
            className='relative inline-flex items-center justify-center w-auto'
            onMouseEnter={() => show && setVisible(true)}
            onMouseLeave={() => show && setVisible(false)}
        >
            {visible &&
                <>
                    <div className='bg-neutral-950 rounded-lg px-3 py-1 inline-block w-auto shadow-lg'>
                        <span className='text-xs font-medium text-white'>Insufficient stock</span>
                    </div>
                    <div className={`bottom-[-2px] left-1/2 transform -translate-x-1/2 absolute border-t-8 border-x-8 border-t-neutral-950  border-x-transparent`} ></div>
                </>
            }

        </div>


    )
}

export default ToolTip