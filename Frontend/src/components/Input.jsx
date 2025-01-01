const Input = ({ icon: Icon, ...props }) => {
    return (
        <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Icon className='size-5 text-neutral-800' />
            </div>
            <input
                {...props}
                className='w-full pl-10 pr-3 py-2 bg-zinc-50 bg-opacity-50 rounded-lg border border-zinc-300 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-500 text-zinc-800 placeholder-zinc-500 transition duration-200'
            />
        </div>
    )
}

export default Input;
