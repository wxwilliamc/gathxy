import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Separator } from "../ui/separator"
import NavItems from "./NavItems"


const MobileNav = () => {
    return (
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <Menu className="w-6 h-6 my-1"/>
                </SheetTrigger>

                <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
                    <h1 className="text-xl font-bold">
                        Gathxy
                    </h1>

                    <Separator className="border border-gray-100"/>

                    <NavItems />
                </SheetContent>
            </Sheet>

        </nav>
    )
}

export default MobileNav