import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"


const Header = () => {
  return (
    <header className="w-full border-b">
        <div className="wrapper flex-between">
            <Link
                href='/'
                className="w-36 font-bold text-xl"
            >
                Gathxy
            </Link>

            {/* Navbar */}
            <SignedIn>
                <nav className="md:flex-between hidden w-full max-w-xs">
                    <NavItems />
                </nav>
            </SignedIn>

            <div className="flex w-32 justify-end gap-3">
                {/* Clerk Setup */}
                {/* Login */}
                <SignedOut>
                    <Button asChild className="rounded-full gradient-button" size='lg'>
                        <Link
                            href='/sign-in'
                        >
                            Login
                        </Link>
                    </Button>
                </SignedOut>

                {/* Logout */}
                <SignedIn>
                    <UserButton afterSignOutUrl="/"/>
                    <MobileNav />
                </SignedIn>
            </div>
        </div>
    </header>
  )
}

export default Header