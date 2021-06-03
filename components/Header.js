import { signIn, signOut, useSession } from "next-auth/client";


function Header() {
    return (
        <header className="absolute z-50 w-full px-16 py-16">
            <div className='flex items-center justify-between'>
                <div className='font-extrabold tracking-wider text-white'>HOWL</div>
                <nav>
                    <ul className="flex">
                        <li className="list-none mx-16">
                            <a href='/' className="text-white no-underline uppercase">discover</a>
                        </li>
                        {/* <li className="list-none mx-16">
                            <a href='/' className="text-white no-underline uppercase">favorites</a>
                        </li> */}
                        <li className="list-none mx-16">
                            <a href='/' className="text-white no-underline uppercase">streaming</a>
                        </li>
                        <li className="list-none mx-16" onClick={signIn}>
                            <a href='/' className="text-white no-underline uppercase">signin</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header