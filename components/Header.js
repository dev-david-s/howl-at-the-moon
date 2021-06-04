import { signIn, signOut, useSession } from "next-auth/client";


function Header() {

    const [session] = useSession();

    return (
        <header className="absolute w-full px-16">
            <div className='flex items-center justify-between'>
                <div className='font-extrabold tracking-wider text-white'>HOWL</div>
                <nav>
                    <ul className="">
                        <li className="list-none mx-16">
                            <a href='/' className="text-white no-underline uppercase">discover</a>
                        </li>
                        {session && <li className="list-none mx-16">
                            <a href='/' className="text-white no-underline uppercase">favorites</a>
                        </li>}
                        <li className="list-none mx-16">
                            <a href='/' className="text-white no-underline uppercase">streaming</a>
                        </li>
                        {!session && <li className="list-none mx-16">
                            <button onClick={signIn} className="focus:outline-none text-white no-underline uppercase">signin</button>
                        </li>}
                        {session && <li className="list-none mx-16">
                            <a href='/' className="text-white no-underline uppercase">profile</a>
                        </li>}
                        {session && <li className="list-none mx-16">
                            <button href='/' onClick={() => signOut()} className="focus:outline-none text-white no-underline uppercase">sign out</button>
                        </li>}
                    </ul>
                </nav>
            </div>
        </header >
    );
}

export default Header