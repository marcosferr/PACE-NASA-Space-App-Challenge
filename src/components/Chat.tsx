import InputComponent from "./Input.tsx"

const Chat = () => {
    return (
        <div className='flex flex-col h-full rounded-md border border-zinc-600 bg-zinc-50 p-4'>
            <section className="flex-grow overflow-auto">
                <p className='text-zinc-950 text-3xl font-bold text-center'>CHAT</p>
            </section>
            <div className="mt-auto">
                <InputComponent />
            </div>
        </div>
    );
};

export default Chat;